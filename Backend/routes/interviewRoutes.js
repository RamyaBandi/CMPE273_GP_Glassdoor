const express = require("express");
const interviewRouter = express.Router();
const interviewServices = require("../servicesMongo/interviewServices");
const interviewKafkaServices = require("../servicesKafka/interviewServices.js");
const { checkAuth } = require("../config/passport");

const { POST_STUDENT_INTERVIEW, GET_COMPANY_INTERVIEWS, GET_STUDENT_INTERVIEWS, GET_COMPANY_INTERVIEW_STATISTICS } = require('../config/routeConstants');

// console.log(process.env.KAFKA_SWITCH)
if (process.env.KAFKA_SWITCH === 'true') {
    interviewRouter.route(POST_STUDENT_INTERVIEW).post(checkAuth, interviewKafkaServices.postStudentInterview);
    interviewRouter.route(GET_COMPANY_INTERVIEWS).get(checkAuth, interviewKafkaServices.getCompanyInterviews);
    interviewRouter.route(GET_STUDENT_INTERVIEWS).get(checkAuth, interviewKafkaServices.getStudentInterviews);
    interviewRouter.route(GET_COMPANY_INTERVIEW_STATISTICS).get(checkAuth, interviewKafkaServices.getInterviewStatistics);
}
else {
    interviewRouter.route(POST_STUDENT_INTERVIEW).post(checkAuth, interviewServices.postStudentInterview);
    interviewRouter.route(GET_COMPANY_INTERVIEWS).get(checkAuth, interviewServices.getCompanyInterviews);
    interviewRouter.route(GET_STUDENT_INTERVIEWS).get(checkAuth, interviewServices.getStudentInterviews);
    interviewRouter.route(GET_COMPANY_INTERVIEW_STATISTICS).get(checkAuth, interviewServices.getInterviewStatistics);
}

module.exports = interviewRouter;