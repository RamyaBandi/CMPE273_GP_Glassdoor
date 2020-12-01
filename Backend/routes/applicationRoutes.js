const express = require("express");
const applicationRouter = express.Router();
const applicationServices = require("../servicesMongo/applicationServices");
//const {checkAuth}=require("../config/passport")
const applicationKafkaServices = require("../servicesKafka/applicationServices");
const { GET_APPLICATIONS_JOBID, POST_APPLICATION, PUT_APPLICATION, GET_APPLICATIONS_ALL, GET_APPLICATIONS_STUDENTID } = require('../config/routeConstants');

// console.log(process.env.KAFKA_SWITCH);
if (process.env.KAFKA_SWITCH === 'true') {
    // console.log("in kafka service")
    // jobRouter.route(POST_COMPANY_JOB).post(jobKafkaServices.postCompanyJob);
    // jobRouter.route(GET_COMPANY_JOBS).get(jobKafkaServices.getCompanyJobs);
    // jobRouter.route(GET_ALL_JOBS).get(jobServices.getAllJobs);

}
else {
    applicationRouter.route(POST_APPLICATION).post(applicationServices.postApplication);
    applicationRouter.route(GET_APPLICATIONS_JOBID).get(applicationServices.getApplicationsByJobId);

}

module.exports = applicationRouter;