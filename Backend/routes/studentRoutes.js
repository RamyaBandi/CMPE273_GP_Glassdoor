const express = require("express");
const studentRouter = express.Router();
const studentServices = require("../servicesMongo/studentServices");
//const {checkAuth}=require("../config/passport")
const {
    POST_STUDENT_SIGNUP
} = require("../config/routeConstants")

// studentRouter.route(PUT_COMPANY_SIGNUP).put(companyServices.updateCompanyProfile);
studentRouter.route(POST_STUDENT_SIGNUP).post(studentServices.createStudentProfile);


module.exports = studentRouter;