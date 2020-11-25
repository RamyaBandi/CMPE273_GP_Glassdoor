const express = require("express");
const jobRouter = express.Router();
const jobServices = require("../servicesMongo/jobServices");
const jobKafkaServices = require("../servicesKafka/jobServices");
const { POST_COMPANY_JOB, GET_COMPANY_JOBS } = require('../config/routeConstants');

console.log(process.env.KAFKA_SWITCH);
if (process.env.KAFKA_SWITCH === 'true') {
    console.log("in kafka service")
    jobRouter.route(POST_COMPANY_JOB).post(jobKafkaServices.postCompanyJob);
    jobRouter.route(GET_COMPANY_JOBS).get(jobKafkaServices.getCompanyJobs);
}
else {
    jobRouter.route(POST_COMPANY_JOB).post(jobServices.postCompanyJob);
    jobRouter.route(GET_COMPANY_JOBS).get(jobServices.getCompanyJobs);
}

module.exports = jobRouter;