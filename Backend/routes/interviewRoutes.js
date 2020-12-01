const express = require("express");
const interviewRouter = express.Router();
const interviewServices = require("../servicesMongo/interviewServices");
const interviewKafkaServices = require("../servicesKafka/interviewServices.js");
// const { checkAuth } = require("../config/passport");

const { POST_STUDENT_INTERVIEW, GET_COMPANY_INTERVIEWS, GET_STUDENT_INTERVIEWS, GET_COMPANY_INTERVIEW_STATISTICS } = require('../config/routeConstants');

// console.log(process.env.KAFKA_SWITCH)
if (process.env.KAFKA_SWITCH === 'true') {
    console.log("in kafka service")
    interviewRouter.route(POST_STUDENT_INTERVIEW).post(interviewKafkaServices.postStudentInterview);
    interviewRouter.route(GET_COMPANY_INTERVIEWS).get(interviewKafkaServices.getCompanyInterviews);
    interviewRouter.route(GET_STUDENT_INTERVIEWS).get(interviewKafkaServices.getStudentInterviews);
    interviewRouter.route(GET_COMPANY_INTERVIEW_STATISTICS).get(interviewKafkaServices.getInterviewStatistics);
}
else {
    interviewRouter.route(POST_STUDENT_INTERVIEW).post(interviewServices.postStudentInterview);
    interviewRouter.route(GET_COMPANY_INTERVIEWS).get(interviewServices.getCompanyInterviews);
    interviewRouter.route(GET_STUDENT_INTERVIEWS).get(interviewServices.getStudentInterviews);
    interviewRouter.route(GET_COMPANY_INTERVIEW_STATISTICS).get(interviewServices.getInterviewStatistics);
}

module.exports = interviewRouter;