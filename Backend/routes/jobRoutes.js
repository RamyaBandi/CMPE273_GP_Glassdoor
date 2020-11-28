const express = require("express");
const jobRouter = express.Router();
const jobServices = require("../servicesMongo/jobServices");
//const {checkAuth}=require("../config/passport")
const jobKafkaServices = require("../servicesKafka/jobServices");
const { GET_ALL_JOBS, GET_COMPANY_JOB, GET_COMPANY_JOBS, POST_COMPANY_JOB, PUT_COMPANY_JOB } = require('../config/routeConstants');

// console.log(process.env.KAFKA_SWITCH);
if (process.env.KAFKA_SWITCH === 'true') {
    console.log("in kafka service")
    jobRouter.route(POST_COMPANY_JOB).post(jobKafkaServices.postCompanyJob);
    jobRouter.route(GET_COMPANY_JOBS).get(jobKafkaServices.getCompanyJobs);
    jobRouter.route(GET_ALL_JOBS).get(jobServices.getAllJobs);

}
else {
    jobRouter.route(POST_COMPANY_JOB).post(jobServices.postCompanyJob);
    jobRouter.route(PUT_COMPANY_JOB).put(jobServices.updateCompanyJob);
    jobRouter.route(GET_COMPANY_JOBS).get(jobServices.getCompanyJobs);
    jobRouter.route(GET_ALL_JOBS).get(jobServices.getAllJobs);

}

module.exports = jobRouter;