const express = require("express");
const reviewRouter = express.Router();
const reviewServices = require("../servicesMongo/reviewServices");
const reviewKafkaServices = require("../servicesKafka/reviewServices");
const { checkAuth } = require("../config/passport");


const { POST_STUDENT_REVIEW, GET_COMPANY_REVIEWS, GET_ALL_REVIEWS, GET_STUDENT_REVIEWS, POST_COMPANY_REPLY,
    PUT_COMPANY_REVIEW_HELPFUL, PUT_COMPANY_REPLY, GET_POSITIVE_REVIEW, GET_NEGATIVE_REVIEW, GET_REVIEW_AVERAGE,
    PUT_REVIEW_APPROVE, PUT_REVIEW_REJECT, GET_REVIEW_DETAILS, GET_APPROVED_COMPANY_REVIEWS } = require('../config/routeConstants');



// console.log(process.env.KAFKA_SWITCH)
if (process.env.KAFKA_SWITCH === 'true') {
    console.log("in kafka service")
    reviewRouter.route(POST_STUDENT_REVIEW).post(checkAuth, reviewKafkaServices.postStudentReview);
    reviewRouter.route(GET_COMPANY_REVIEWS).get(checkAuth, reviewKafkaServices.getCompanyReviews);
    reviewRouter.route(GET_STUDENT_REVIEWS).get(checkAuth, reviewKafkaServices.getStudentReviews);
    reviewRouter.route(PUT_COMPANY_REVIEW_HELPFUL).put(checkAuth, reviewKafkaServices.updateReviewHelpfulCount);
    reviewRouter.route(GET_POSITIVE_REVIEW).get(checkAuth, reviewKafkaServices.getMostPositiveReview);
    reviewRouter.route(GET_NEGATIVE_REVIEW).get(checkAuth, reviewKafkaServices.getMostNegativeReview);
    reviewRouter.route(PUT_COMPANY_REPLY).put(checkAuth, reviewKafkaServices.postReplyFromCompany);
    reviewRouter.route(GET_REVIEW_AVERAGE).get(checkAuth, reviewKafkaServices.getReviewAverage);
    reviewRouter.route(PUT_REVIEW_APPROVE).put(checkAuth, reviewKafkaServices.putReviewApprove);
    reviewRouter.route(PUT_REVIEW_REJECT).put(checkAuth, reviewKafkaServices.putReviewReject);
    reviewRouter.route(GET_REVIEW_DETAILS).get(checkAuth, reviewKafkaServices.getReviewDetails);
    reviewRouter.route(GET_ALL_REVIEWS).get(checkAuth, reviewKafkaServices.getAllReviews);
    reviewRouter.route(GET_APPROVED_COMPANY_REVIEWS).get(checkAuth, reviewKafkaServices.getApprovedCompanyReviews);
}
else {
    reviewRouter.route(POST_STUDENT_REVIEW).post(checkAuth, reviewServices.postStudentReview);
    reviewRouter.route(GET_COMPANY_REVIEWS).get(checkAuth, reviewServices.getCompanyReviews);
    reviewRouter.route(GET_STUDENT_REVIEWS).get(checkAuth, reviewServices.getStudentReviews);
    reviewRouter.route(PUT_COMPANY_REPLY).put(checkAuth, reviewServices.postReplyFromCompany);
    reviewRouter.route(PUT_COMPANY_REVIEW_HELPFUL).put(checkAuth, reviewServices.updateReviewHelpfulCount);
    reviewRouter.route(GET_POSITIVE_REVIEW).get(checkAuth, reviewServices.getMostPositiveReview);
    reviewRouter.route(GET_NEGATIVE_REVIEW).get(checkAuth, reviewServices.getMostNegativeReview);
    reviewRouter.route(GET_REVIEW_AVERAGE).get(checkAuth, reviewServices.getReviewAverage);
    reviewRouter.route(PUT_REVIEW_APPROVE).put(checkAuth, reviewServices.putReviewApprove);
    reviewRouter.route(PUT_REVIEW_REJECT).put(checkAuth, reviewServices.putReviewReject);
    reviewRouter.route(GET_REVIEW_DETAILS).get(checkAuth, reviewServices.getReviewDetails);
    reviewRouter.route(GET_ALL_REVIEWS).get(checkAuth, reviewServices.getAllReviews);
    reviewRouter.route(GET_APPROVED_COMPANY_REVIEWS).get(checkAuth, reviewServices.getApprovedCompanyReviews);
}

module.exports = reviewRouter;