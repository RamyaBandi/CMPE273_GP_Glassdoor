const express = require("express");
const studentRouter = express.Router();
const studentServices = require("../servicesMongo/studentServices");
//const {checkAuth}=require("../config/passport")
const {
    POST_STUDENT_SIGNUP,
    GET_STUDENT_SIGNUP,
    PUT_STUDENT_SIGNUP,
    PUT_STUDENT_DEMOGRAPHICS,
    PUT_STUDENT_JOBPREFERENCE,
    POST_RESUME_UPLOAD,
    GET_STUDENT_RESUMES,
    PUT_PRIMARY_RESUME,
    DELETE_STUDENT_RESUME,
    GET_COUNT_RATINGS
} = require("../config/routeConstants")


studentRouter.route(POST_STUDENT_SIGNUP).post(studentServices.createStudentProfile);
studentRouter.route(GET_STUDENT_SIGNUP).get(studentServices.getSudentDetails);
studentRouter.route(PUT_STUDENT_SIGNUP).put(studentServices.updateStudentDetails);
studentRouter.route(PUT_STUDENT_DEMOGRAPHICS).put(studentServices.updateStudentDemographics);
studentRouter.route(PUT_STUDENT_JOBPREFERENCE).put(studentServices.updateStudentJobPreferences);
studentRouter.route(POST_RESUME_UPLOAD).post(studentServices.updateStudentResume);
studentRouter.route(GET_STUDENT_RESUMES).get(studentServices.getStudentResumes);
studentRouter.route(PUT_PRIMARY_RESUME).put(studentServices.updatePrimaryResume);
studentRouter.route(DELETE_STUDENT_RESUME).delete(studentServices.deleteStudentResume);
studentRouter.route(GET_COUNT_RATINGS).get(studentServices.getRatingsCount);

module.exports = studentRouter;