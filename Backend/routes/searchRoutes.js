const express = require("express");
const searchRouter = express.Router();
const searchServices = require("../servicesMongo/searchServices");
const searchKafkaServices = require('../servicesKafka/searchServices')
const { checkAuth } = require('../config/passport')

const { GET_JOB_SEARCH, GET_COMPANY_SEARCH, GET_SALARY_SEARCH, GET_INTERVIEW_SEARCH } = require('../config/routeConstants');


if (process.env.KAFKA_SWITCH === 'true') {
    searchRouter.route(GET_JOB_SEARCH).get(checkAuth, searchServices.jobSearch);
    
    searchRouter.route(GET_COMPANY_SEARCH).get(checkAuth, searchServices.companySearch);

    searchRouter.route(GET_SALARY_SEARCH).get(checkAuth, searchServices.salarySearch);

    searchRouter.route(GET_INTERVIEW_SEARCH).get(checkAuth, searchServices.interviewSearch);
}
else {
    searchRouter.route(GET_JOB_SEARCH).get(checkAuth, searchServices.jobSearch);
    
    searchRouter.route(GET_COMPANY_SEARCH).get(checkAuth, searchServices.companySearch);

    searchRouter.route(GET_SALARY_SEARCH).get(checkAuth, searchServices.salarySearch);

    searchRouter.route(GET_INTERVIEW_SEARCH).get(checkAuth, searchServices.interviewSearch);
}

// else {
//     searchRouter.route(GET_JOB_SEARCH).get(searchServices.jobSearch);

//     searchRouter.route(GET_COMPANY_SEARCH).get(searchServices.companySearch);

//     searchRouter.route(GET_SALARY_SEARCH).get(searchServices.salarySearch);

//     searchRouter.route(GET_INTERVIEW_SEARCH).get(searchServices.interviewSearch);

// }

module.exports = searchRouter;