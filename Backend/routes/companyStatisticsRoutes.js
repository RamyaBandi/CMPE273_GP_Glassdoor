const express = require("express");
const statisticsRouter = express.Router();
const statisticsServices = require("../servicesMongo/companyStatisticsServices");
const statisticsKafkaServices = require("../servicesKafka/companyStatisticsServices");
// const { checkAuth } = require("../config/passport");

const { GET_STATISTICS_APPLICANT_DEMOGRAPHICS, GET_STATISTICS_JOBS_COUNT, GET_STATISTICS_APPLICATIONS_COUNT } = require('../config/routeConstants');

// console.log(process.env.KAFKA_SWITCH)
if (process.env.KAFKA_SWITCH === 'true') {
    statisticsRouter.route(GET_STATISTICS_APPLICATIONS_COUNT).get(statisticsKafkaServices.getApplicantsCount);
    statisticsRouter.route(GET_STATISTICS_JOBS_COUNT).get(statisticsKafkaServices.getJobsCount);
    statisticsRouter.route(GET_STATISTICS_APPLICANT_DEMOGRAPHICS).get(statisticsKafkaServices.getApplicationDemographics);
}
else {
    statisticsRouter.route(GET_STATISTICS_APPLICATIONS_COUNT).get(statisticsServices.getApplicantsCount);
    statisticsRouter.route(GET_STATISTICS_JOBS_COUNT).get(statisticsServices.getJobsCount);
    statisticsRouter.route(GET_STATISTICS_APPLICANT_DEMOGRAPHICS).get(statisticsServices.getApplicationDemographics);
}

module.exports = statisticsRouter;