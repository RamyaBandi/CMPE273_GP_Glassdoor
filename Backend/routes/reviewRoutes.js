const express = require("express");
const reviewRouter = express.Router();
const reviewServices = require("../servicesMongo/reviewServices");
// const { checkAuth } = require("../config/passport");

const { POST_STUDENT_REVIEW, GET_COMPANY_REVIEWS, GET_ALL_REVIEWS, GET_STUDENT_REVIEWS, POST_COMPANY_REPLY } = require('../config/routeConstants');

reviewRouter.route(POST_STUDENT_REVIEW).post(reviewServices.postStudentReview);



module.exports = reviewRouter;