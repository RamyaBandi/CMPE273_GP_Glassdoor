const express = require("express");
const studentRouter = express.Router();
const studentServices = require("../servicesMongo/studentServices");
//const {checkAuth}=require("../config/passport")
const {
    POST_STUDENT_SIGNUP,
    GET_STUDENT_SIGNUP,
    PUT_STUDENT_SIGNUP
} = require("../config/routeConstants")


studentRouter.route(POST_STUDENT_SIGNUP).post(studentServices.createStudentProfile);
studentRouter.route(GET_STUDENT_SIGNUP).get(studentServices.getSudentDetails);
studentRouter.route(PUT_STUDENT_SIGNUP).put(studentServices.updateStudentDetails);

module.exports = studentRouter;