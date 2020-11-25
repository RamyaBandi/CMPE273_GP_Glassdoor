const express = require("express");
const interviewRouter = express.Router();
const interviewServices = require("../servicesMongo/interviewServices");
const interviewKafkaServices = require("../servicesKafka/interviewServices.js");
// const { checkAuth } = require("../config/passport");

const { POST_STUDENT_INTERVIEW, GET_COMPANY_INTERVIEWS, GET_STUDENT_INTERVIEWS } = require('../config/routeConstants');

console.log(process.env.KAFKA_SWITCH)
if (process.env.KAFKA_SWITCH === 'true') {
    console.log("in kafka service")
    interviewRouter.route(POST_STUDENT_INTERVIEW).post(interviewKafkaServices.postStudentInterview);
    interviewRouter.route(GET_COMPANY_INTERVIEWS).get(interviewKafkaServices.getCompanyInterviews);
    interviewRouter.route(GET_STUDENT_INTERVIEWS).get(interviewKafkaServices.getStudentInterviews);
}
else {
    interviewRouter.route(POST_STUDENT_INTERVIEW).post(interviewServices.postStudentInterview);
    interviewRouter.route(GET_COMPANY_INTERVIEWS).get(interviewServices.getCompanyInterviews);
    interviewRouter.route(GET_STUDENT_INTERVIEWS).get(interviewServices.getStudentInterviews);
}

module.exports = interviewRouter;