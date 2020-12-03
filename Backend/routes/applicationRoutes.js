const express = require("express");
const applicationRouter = express.Router();
const applicationServices = require("../servicesMongo/applicationServices");
//const {checkAuth}=require("../config/passport")
const applicationKafkaServices = require("../servicesKafka/applicationServices");
const { GET_APPLICATIONS_JOBID, POST_APPLICATION, PUT_APPLICATION, GET_APPLICATIONS_ALL, GET_APPLICATIONS_STUDENTID } = require('../config/routeConstants');

// console.log(process.env.KAFKA_SWITCH);
if (process.env.KAFKA_SWITCH === 'true') {
    applicationRouter.route(POST_APPLICATION).post(applicationKafkaServices.postApplication);
    applicationRouter.route(GET_APPLICATIONS_JOBID).get(applicationKafkaServices.getApplicationsByJobId);
    applicationRouter.route(PUT_APPLICATION).put(applicationKafkaServices.putApplications);
    applicationRouter.route(GET_APPLICATIONS_STUDENTID).get(applicationKafkaServices.getApplicationsByStudentId);

}
else {
    applicationRouter.route(POST_APPLICATION).post(applicationServices.postApplication);
    applicationRouter.route(GET_APPLICATIONS_JOBID).get(applicationServices.getApplicationsByJobId);
    applicationRouter.route(PUT_APPLICATION).put(applicationServices.putApplications);
    applicationRouter.route(GET_APPLICATIONS_STUDENTID).get(applicationServices.getApplicationsByStudentId);


}

module.exports = applicationRouter;