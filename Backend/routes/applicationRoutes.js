const express = require("express");
const applicationRouter = express.Router();
const applicationServices = require("../servicesMongo/applicationServices");
//const {checkAuth}=require("../config/passport")
const applicationKafkaServices = require("../servicesKafka/applicationServices");
const { checkAuth } = require('../config/passport')
const { GET_APPLICATIONS_JOBID, POST_APPLICATION, PUT_APPLICATION, GET_APPLICATIONS_ALL, GET_APPLICATIONS_STUDENTID } = require('../config/routeConstants');

// console.log(process.env.KAFKA_SWITCH);
if (process.env.KAFKA_SWITCH === 'true') {
    applicationRouter.route(POST_APPLICATION).post(checkAuth, applicationKafkaServices.postApplication);
    applicationRouter.route(GET_APPLICATIONS_JOBID).get(checkAuth, applicationServices.getApplicationsByJobId);
    applicationRouter.route(PUT_APPLICATION).put(checkAuth, applicationKafkaServices.putApplications);

}
else {
    applicationRouter.route(POST_APPLICATION).post(checkAuth, applicationServices.postApplication);
    applicationRouter.route(GET_APPLICATIONS_JOBID).get(checkAuth, applicationServices.getApplicationsByJobId);
    applicationRouter.route(PUT_APPLICATION).put(checkAuth, applicationServices.putApplications);

}

module.exports = applicationRouter;