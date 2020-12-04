const express = require("express");
const jobRouter = express.Router();
const jobServices = require("../servicesMongo/jobServices");
const {checkAuth}=require("../config/passport")
const jobKafkaServices = require("../servicesKafka/jobServices");
const { GET_ALL_JOBS, GET_COMPANY_JOBS_BY_JOBTITLE_OR_CITY, GET_COMPANY_JOBS_BY_JOBTITLE, GET_COMPANY_JOBS_BY_CITY, GET_COMPANY_JOBS, POST_COMPANY_JOB, PUT_COMPANY_JOB, GET_COMPANY_JOB_BY_JOBID } = require('../config/routeConstants');

if (process.env.KAFKA_SWITCH === 'true') {
    // console.log("in kafka service")
    // jobRouter.route(POST_COMPANY_JOB).post(jobKafkaServices.postCompanyJob);
    // jobRouter.route(GET_COMPANY_JOBS).get(jobKafkaServices.getCompanyJobs);
    // jobRouter.route(GET_ALL_JOBS).get(jobKafkaServices.getAllJobs);
    // jobRouter.route(GET_COMPANY_JOBS_BY_JOBTITLE).get(jobKafkaServices.getCompanyJobsByJobTitle);
    // jobRouter.route(GET_COMPANY_JOBS_BY_CITY).get(jobKafkaServices.getCompanyJobsByCity);
  
    jobRouter.route(POST_COMPANY_JOB).post(checkAuth, jobKafkaServices.postCompanyJob);
    jobRouter.route(PUT_COMPANY_JOB).put(checkAuth, jobKafkaServices.updateCompanyJob);
    jobRouter.route(GET_COMPANY_JOBS).get(checkAuth, jobKafkaServices.getCompanyJobs);
    jobRouter.route(GET_ALL_JOBS).get(checkAuth, jobKafkaServices.getAllJobs);
    jobRouter.route(GET_COMPANY_JOBS_BY_JOBTITLE_OR_CITY).get(checkAuth, jobKafkaServices.getCompanyJobsByJobTitleOrCity);
    jobRouter.route(GET_COMPANY_JOBS_BY_JOBTITLE).get(checkAuth, jobKafkaServices.getCompanyJobsByJobTitle);
    jobRouter.route(GET_COMPANY_JOBS_BY_CITY).get(checkAuth, jobKafkaServices.getCompanyJobsByCity);
    jobRouter.route(GET_COMPANY_JOB_BY_JOBID).get(checkAuth, jobKafkaServices.getCompanyJobsByJobId);
}
else {
    jobRouter.route(POST_COMPANY_JOB).post(checkAuth, jobServices.postCompanyJob);
    jobRouter.route(PUT_COMPANY_JOB).put(checkAuth, jobServices.updateCompanyJob);
    jobRouter.route(GET_COMPANY_JOBS).get(checkAuth, jobServices.getCompanyJobs);
    jobRouter.route(GET_ALL_JOBS).get(checkAuth, jobServices.getAllJobs);
    jobRouter.route(GET_COMPANY_JOBS_BY_JOBTITLE_OR_CITY).get(checkAuth, jobServices.getCompanyJobsByJobTitleOrCity);
    jobRouter.route(GET_COMPANY_JOBS_BY_JOBTITLE).get(checkAuth, jobServices.getCompanyJobsByJobTitle);
    jobRouter.route(GET_COMPANY_JOBS_BY_CITY).get(checkAuth, jobServices.getCompanyJobsByCity);
    jobRouter.route(GET_COMPANY_JOB_BY_JOBID).get(checkAuth, jobServices.getCompanyJobsByJobId);
}

module.exports = jobRouter;