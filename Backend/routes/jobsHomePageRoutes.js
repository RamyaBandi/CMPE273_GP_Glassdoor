const express = require("express");
const jobsRouter = express.Router();
const jobsServices = require("../servicesMongo/jobsHomePageServices");
const jobsHomeKafkaServices = require("../servicesKafka/jobsHomePageServices");
const { checkAuth } = require('../config/passport')
const { GET_JOBS_HOMEPAGE } = require('../config/routeConstants');

if (process.env.KAFKA_SWITCH === 'true') {
    console.log("in kafka service")

    jobsRouter.route(GET_JOBS_HOMEPAGE).get(checkAuth, jobsHomeKafkaServices.jobsHomePage);
}
else {
    jobsRouter.route(GET_JOBS_HOMEPAGE).get(checkAuth, jobsServices.jobsHomePage);
}


// jobsRouter.route().get(jobsServices.jobsHomePage);

module.exports = jobsRouter;