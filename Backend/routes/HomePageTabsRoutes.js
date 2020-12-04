const express = require("express");
const homeTabsRouter = express.Router();
const homeTabsServices = require("../servicesMongo/HomePageTabsServices");
const homeTabKafkaServices = require('../servicesKafka/HomePageTabsServices')
const { checkAuth } = require('../config/passport')

const { GET_COMPANY_HOMETAB, GET_SALARY_HOMETAB, GET_INTERVIEW_HOMETAB } = require('../config/routeConstants');


if (process.env.KAFKA_SWITCH === 'true') {

    
    homeTabsRouter.route(GET_COMPANY_HOMETAB).get( homeTabsServices.companyHomePage);
    // homeTabsRouter.route(GET_SALARY_HOMETAB).get( homeTabsServices.salaryHomePage );

    // homeTabsRouter.route(GET_INTERVIEW_HOMETAB).get( homeTabsServices.interviewHomePage);
}
else {
    homeTabsRouter.route(GET_COMPANY_HOMETAB).get( homeTabsServices.companyHomePage);
    
   

    // homeTabsRouter.route(GET_SALARY_HOMETAB).get( homeTabsServices.salaryHomePage );

    // homeTabsRouter.route(GET_INTERVIEW_HOMETAB).get( homeTabsServices.interviewHomePage);
}

// else {
//     searchRouter.route(GET_JOB_SEARCH).get(searchServices.jobSearch);

//     searchRouter.route(GET_COMPANY_SEARCH).get(searchServices.companySearch);

//     searchRouter.route(GET_SALARY_SEARCH).get(searchServices.salarySearch);

//     searchRouter.route(GET_INTERVIEW_SEARCH).get(searchServices.interviewSearch);

// }

module.exports = homeTabsRouter;