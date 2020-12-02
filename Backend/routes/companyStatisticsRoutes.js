const express = require("express");
const statisticsRouter = express.Router();
const statisticsServices = require("../servicesMongo/companyStatisticsServices");
const statisticsKafkaServices = require("../servicesKafka/interviewServices.js");
// const { checkAuth } = require("../config/passport");

const { GET_STATISTICS_APPLICANT_DEMOGRAPHICS, GET_STATISTICS_JOBS_COUNT, GET_STATISTICS_APPLICATIONS_COUNT } = require('../config/routeConstants');

// console.log(process.env.KAFKA_SWITCH)
if (process.env.KAFKA_SWITCH === 'true') {
    console.log("in kafka service")

}
else {
    statisticsRouter.route(GET_STATISTICS_APPLICATIONS_COUNT).get(statisticsServices.getApplicantsCount);
    statisticsRouter.route(GET_STATISTICS_JOBS_COUNT).get(statisticsServices.getJobsCount);
    statisticsRouter.route(GET_STATISTICS_APPLICANT_DEMOGRAPHICS).get(statisticsServices.getApplicationDemographics);
}

module.exports = statisticsRouter;