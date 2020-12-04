const express = require("express");
const adminAnalyticsRouter = express.Router();
const adminAnalyticsServices = require("../servicesMongo/adminDashboardServices");
const adminAnalyticsKafkaServices = require("../servicesKafka/adminDashboardServices")
const { checkAuth } = require('../config/passport')

const { GET_REVIEWS_PER_DAY, GET_TOP_REVIEWED_COMPANIES, GET_TOP_AVERAGE_RATED_COMPANIES, GET_TOP_STUDENTS_ON_RATING, GET_TOP_CEO_RATING, GET_TOP_COMPANY_VIEWS } = require('../config/routeConstants');

if (process.env.KAFKA_SWITCH === 'true') {
    adminAnalyticsRouter.route(GET_REVIEWS_PER_DAY).get(checkAuth, adminAnalyticsServices.reviewsperday);

    adminAnalyticsRouter.route(GET_TOP_REVIEWED_COMPANIES).get(checkAuth, adminAnalyticsServices.topreviewedcompanies);

    adminAnalyticsRouter.route(GET_TOP_AVERAGE_RATED_COMPANIES).get(checkAuth, adminAnalyticsServices.averageratedcompanies);

    adminAnalyticsRouter.route(GET_TOP_STUDENTS_ON_RATING).get(checkAuth, adminAnalyticsServices.topstudentratings);

    adminAnalyticsRouter.route(GET_TOP_CEO_RATING).get(checkAuth, adminAnalyticsServices.topceorating);

    adminAnalyticsRouter.route(GET_TOP_COMPANY_VIEWS).get(checkAuth, adminAnalyticsServices.topcompanyviews);
}
else {
    adminAnalyticsRouter.route(GET_REVIEWS_PER_DAY).get(checkAuth, adminAnalyticsServices.reviewsperday);

    adminAnalyticsRouter.route(GET_TOP_REVIEWED_COMPANIES).get(checkAuth, adminAnalyticsServices.topreviewedcompanies);

    adminAnalyticsRouter.route(GET_TOP_AVERAGE_RATED_COMPANIES).get(checkAuth, adminAnalyticsServices.averageratedcompanies);

    adminAnalyticsRouter.route(GET_TOP_STUDENTS_ON_RATING).get(checkAuth, adminAnalyticsServices.topstudentratings);

    adminAnalyticsRouter.route(GET_TOP_CEO_RATING).get(checkAuth, adminAnalyticsServices.topceorating);

    adminAnalyticsRouter.route(GET_TOP_COMPANY_VIEWS).get(checkAuth, adminAnalyticsServices.topcompanyviews);
}


module.exports = adminAnalyticsRouter;