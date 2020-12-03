const express = require("express");
const reviewRouter = express.Router();
const reviewServices = require("../servicesMongo/reviewServices");
const reviewKafkaServices = require("../servicesKafka/reviewServices");
// const { checkAuth } = require("../config/passport");


const { POST_STUDENT_REVIEW, GET_COMPANY_REVIEWS, GET_ALL_REVIEWS, GET_STUDENT_REVIEWS, POST_COMPANY_REPLY,
    PUT_COMPANY_REVIEW_HELPFUL, PUT_COMPANY_REPLY, GET_POSITIVE_REVIEW, GET_NEGATIVE_REVIEW, GET_REVIEW_AVERAGE,
    PUT_REVIEW_APPROVE, PUT_REVIEW_REJECT, GET_REVIEW_DETAILS, GET_APPROVED_COMPANY_REVIEWS } = require('../config/routeConstants');



// console.log(process.env.KAFKA_SWITCH)
if (process.env.KAFKA_SWITCH === 'true') {
    // console.log("in kafka service")
    // reviewRouter.route(POST_STUDENT_REVIEW).post(reviewKafkaServices.postStudentReview);
    // reviewRouter.route(GET_COMPANY_REVIEWS).get(reviewKafkaServices.getCompanyReviews);
    // reviewRouter.route(GET_STUDENT_REVIEWS).get(reviewKafkaServices.getStudentReviews);
    // reviewRouter.route(PUT_COMPANY_REVIEW_HELPFUL).put(reviewKafkaServices.updateReviewHelpfulCount);
    // reviewRouter.route(GET_POSITIVE_REVIEW).get(reviewKafkaServices.getMostPositiveReview);
    // reviewRouter.route(GET_NEGATIVE_REVIEW).get(reviewKafkaServices.getMostNegativeReview);
    // reviewRouter.route(PUT_COMPANY_REPLY).put(reviewKafkaServices.postReplyFromCompany);
    // reviewRouter.route(GET_REVIEW_AVERAGE).get(reviewKafkaServices.getReviewAverage);


    reviewRouter.route(POST_STUDENT_REVIEW).post(reviewKafkaServices.postStudentReview);
    reviewRouter.route(GET_COMPANY_REVIEWS).get(reviewKafkaServices.getCompanyReviews);
    reviewRouter.route(GET_STUDENT_REVIEWS).get(reviewKafkaServices.getStudentReviews);
    reviewRouter.route(PUT_COMPANY_REVIEW_HELPFUL).put(reviewKafkaServices.updateReviewHelpfulCount);
    reviewRouter.route(GET_POSITIVE_REVIEW).get(reviewKafkaServices.getMostPositiveReview);
    reviewRouter.route(GET_NEGATIVE_REVIEW).get(reviewKafkaServices.getMostNegativeReview);
    // reviewRouter.route(PUT_COMPANY_REPLY).put(reviewKafkaServices.postReplyFromCompany);
    reviewRouter.route(GET_REVIEW_AVERAGE).get(reviewKafkaServices.getReviewAverage);
    reviewRouter.route(PUT_REVIEW_APPROVE).put(reviewKafkaServices.putReviewApprove);
    reviewRouter.route(PUT_REVIEW_REJECT).put(reviewKafkaServices.putReviewReject);
    reviewRouter.route(GET_REVIEW_DETAILS).get(reviewKafkaServices.getReviewDetails);
    reviewRouter.route(GET_ALL_REVIEWS).get(reviewKafkaServices.getAllReviews);
    reviewRouter.route(GET_APPROVED_COMPANY_REVIEWS).get(reviewKafkaServices.getApprovedCompanyReviews);
}
else {
    reviewRouter.route(POST_STUDENT_REVIEW).post(reviewServices.postStudentReview);
    reviewRouter.route(GET_COMPANY_REVIEWS).get(reviewServices.getCompanyReviews);
    reviewRouter.route(GET_STUDENT_REVIEWS).get(reviewServices.getStudentReviews);
    reviewRouter.route(PUT_COMPANY_REPLY).put(reviewServices.postReplyFromCompany);
    reviewRouter.route(PUT_COMPANY_REVIEW_HELPFUL).put(reviewServices.updateReviewHelpfulCount);
    reviewRouter.route(GET_POSITIVE_REVIEW).get(reviewServices.getMostPositiveReview);
    reviewRouter.route(GET_NEGATIVE_REVIEW).get(reviewServices.getMostNegativeReview);
    reviewRouter.route(GET_REVIEW_AVERAGE).get(reviewServices.getReviewAverage);
    reviewRouter.route(PUT_REVIEW_APPROVE).put(reviewServices.putReviewApprove);
    reviewRouter.route(PUT_REVIEW_REJECT).put(reviewServices.putReviewReject);
    reviewRouter.route(GET_REVIEW_DETAILS).get(reviewServices.getReviewDetails);
    reviewRouter.route(GET_ALL_REVIEWS).get(reviewServices.getAllReviews);
    reviewRouter.route(GET_APPROVED_COMPANY_REVIEWS).get(reviewServices.getApprovedCompanyReviews);
}

module.exports = reviewRouter;