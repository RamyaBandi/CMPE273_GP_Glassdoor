const express = require("express");
const jobRouter = express.Router();
const jobServices = require("../servicesMongo/jobServices");
//const {checkAuth}=require("../config/passport")
const jobKafkaServices = require("../servicesKafka/jobServices");
const { GET_ALL_JOBS, GET_COMPANY_JOBS_BY_JOBTITLE_OR_CITY, GET_COMPANY_JOBS_BY_JOBTITLE, GET_COMPANY_JOBS_BY_CITY, GET_COMPANY_JOBS, POST_COMPANY_JOB, PUT_COMPANY_JOB, GET_COMPANY_JOB_BY_JOBID } = require('../config/routeConstants');

if (process.env.KAFKA_SWITCH === 'true') {
    // console.log("in kafka service")
    // jobRouter.route(POST_COMPANY_JOB).post(jobKafkaServices.postCompanyJob);
    // jobRouter.route(GET_COMPANY_JOBS).get(jobKafkaServices.getCompanyJobs);
    // jobRouter.route(GET_ALL_JOBS).get(jobKafkaServices.getAllJobs);
    // jobRouter.route(GET_COMPANY_JOBS_BY_JOBTITLE).get(jobKafkaServices.getCompanyJobsByJobTitle);
    // jobRouter.route(GET_COMPANY_JOBS_BY_CITY).get(jobKafkaServices.getCompanyJobsByCity);

    jobRouter.route(POST_COMPANY_JOB).post(jobKafkaServices.postCompanyJob);
    jobRouter.route(PUT_COMPANY_JOB).put(jobKafkaServices.updateCompanyJob);
    jobRouter.route(GET_COMPANY_JOBS).get(jobKafkaServices.getCompanyJobs);
    jobRouter.route(GET_ALL_JOBS).get(jobKafkaServices.getAllJobs);
    jobRouter.route(GET_COMPANY_JOBS_BY_JOBTITLE_OR_CITY).get(jobKafkaServices.getCompanyJobsByJobTitleOrCity);
    jobRouter.route(GET_COMPANY_JOBS_BY_JOBTITLE).get(jobKafkaServices.getCompanyJobsByJobTitle);
    jobRouter.route(GET_COMPANY_JOBS_BY_CITY).get(jobKafkaServices.getCompanyJobsByCity);
    jobRouter.route(GET_COMPANY_JOB_BY_JOBID).get(jobKafkaServices.getCompanyJobsByJobId);
}
else {
    jobRouter.route(POST_COMPANY_JOB).post(jobServices.postCompanyJob);
    jobRouter.route(PUT_COMPANY_JOB).put(jobServices.updateCompanyJob);
    jobRouter.route(GET_COMPANY_JOBS).get(jobServices.getCompanyJobs);
    jobRouter.route(GET_ALL_JOBS).get(jobServices.getAllJobs);
    jobRouter.route(GET_COMPANY_JOBS_BY_JOBTITLE_OR_CITY).get(jobServices.getCompanyJobsByJobTitleOrCity);
    jobRouter.route(GET_COMPANY_JOBS_BY_JOBTITLE).get(jobServices.getCompanyJobsByJobTitle);
    jobRouter.route(GET_COMPANY_JOBS_BY_CITY).get(jobServices.getCompanyJobsByCity);
    jobRouter.route(GET_COMPANY_JOB_BY_JOBID).get(jobServices.getCompanyJobsByJobId);
}

module.exports = jobRouter;