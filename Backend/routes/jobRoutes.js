const express = require("express");
const jobRouter = express.Router();
const jobServices = require("../servicesMongo/jobServices");
//const {checkAuth}=require("../config/passport")
const {
    GET_ALL_JOBS, GET_COMPANY_JOB, GET_COMPANY_JOBS, POST_COMPANY_JOB, PUT_COMPANY_JOB
} = require("../config/routeConstants")

// jobRouter.route(GET_COMPANY_JOBS).get(jobServices.updateCompanyProfile);
jobRouter.route(POST_COMPANY_JOB).post(jobServices.postJob);
jobRouter.route(GET_COMPANY_JOB).get(jobServices.getJobById);
jobRouter.route(GET_ALL_JOBS).get(jobServices.getAllJobs);
// jobRouter.route(PUT_COMPANY_JOB).get(jobServices.updateJobById);


module.exports = jobRouter;