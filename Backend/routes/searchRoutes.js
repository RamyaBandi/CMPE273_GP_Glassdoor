const express = require("express");
const searchRouter = express.Router();
const searchServices = require("../servicesMongo/searchServices");

const { GET_JOB_SEARCH, GET_COMPANY_SEARCH, GET_SALARY_SEARCH, GET_INTERVIEW_SEARCH } = require('../config/routeConstants');

searchRouter.route(GET_JOB_SEARCH).get(searchServices.jobSearch);
searchRouter.route(GET_COMPANY_SEARCH).get(searchServices.companySearch);
searchRouter.route(GET_SALARY_SEARCH).get(searchServices.salarySearch);
searchRouter.route(GET_INTERVIEW_SEARCH).get(searchServices.interviewSearch);

module.exports = searchRouter;