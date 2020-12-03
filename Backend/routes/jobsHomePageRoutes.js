const express = require("express");
const jobsRouter = express.Router();
const jobsServices = require("../servicesMongo/jobsHomePageServices");
const jobsHomeKafkaServices = require("../servicesKafka/jobsHomePageServices");

const { GET_JOBS_HOMEPAGE } = require('../config/routeConstants');

if (process.env.KAFKA_SWITCH === 'true') {
    console.log("in kafka service")

    jobsRouter.route(GET_JOBS_HOMEPAGE).get(jobsHomeKafkaServices.jobsHomePage);
}
else {
    jobsRouter.route(GET_JOBS_HOMEPAGE).get(jobsServices.jobsHomePage);
}


// jobsRouter.route().get(jobsServices.jobsHomePage);

module.exports = jobsRouter;