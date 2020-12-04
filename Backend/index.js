//import the require dependencies
require('dotenv').config({ path: __dirname + '/.env' })
let routeConstants = require('./config/routeConstants');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
// const path = require('path');
// var kafka = require('./kafka/client');
let redis = require('./config/redisConnection')
let mongo = require('./config/mongoConnection')

// redis.flushall();

var passport = require('passport');
var jwt = require('jwt-simple');
app.use(passport.initialize());


app.use(cors({ origin: `${routeConstants.FRONTEND_URL}`, credentials: true }));

const validateroutes = require('./routes/inputValidationRoute');
const registerRoutes = require('./routes/registerRoute');
const loginRoutes = require('./routes/loginRoute');
const tabroutes = require('./routes/HomePageTabsRoutes');
const searchRoutes = require('./routes/searchRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const companyRoutes = require('./routes/companyRoutes');
const studentRoutes = require('./routes/studentRoutes');
const salaryRoutes = require('./routes/salaryRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const jobsHomePageRoutes = require('./routes/jobsHomePageRoutes')
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const companyStatisticsRoutes = require('./routes/companyStatisticsRoutes');
const adminAnalyticsRoutes = require('./routes/adminDashboardRoutes');
const adminCompanyProfileRoutes = require('./routes/adminCompanyProfileRoutes');
const imageRoutes = require('./routes/imageRoutes');
const photoRoutes = require('./routes/photoRoutes');

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));


app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `${routeConstants.FRONTEND_URL}`);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/validateroute', validateroutes)
app.use('/registerroute', registerRoutes);
app.use('/loginroute', loginRoutes);
app.use(routeConstants.GET_SEARCH_RESULTS, searchRoutes);
app.use(routeConstants.STUDENT_TABS_ROUTE, tabroutes);
app.use(routeConstants.REVIEW_ROUTE, reviewRoutes);
app.use(routeConstants.COMPANY_ROUTE, companyRoutes);
app.use(routeConstants.STUDENT_ROUTE, studentRoutes);
app.use(routeConstants.SALARY_ROUTE, salaryRoutes);
app.use(routeConstants.INTERVIEW_ROUTE, interviewRoutes);
app.use(routeConstants.GET_JOBS_HOMEPAGE, jobsHomePageRoutes);
app.use(routeConstants.JOB_ROUTE, jobRoutes);
app.use(routeConstants.APPLICATION_ROUTE, applicationRoutes);
app.use(routeConstants.ADMIN_ROUTES, adminAnalyticsRoutes)
app.use(routeConstants.STATISTICS_ROUTE, companyStatisticsRoutes)
app.use(routeConstants.IMAGE_ROUTES, imageRoutes)
app.use(routeConstants.ADMIN_ROUTES, adminCompanyProfileRoutes);
app.use(routeConstants.PHOTO_ROUTE, photoRoutes);

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");