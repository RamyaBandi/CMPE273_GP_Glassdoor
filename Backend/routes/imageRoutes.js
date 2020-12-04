const express = require("express");
const imageRouter = express.Router();
const imageServices = require("../servicesMongo/imageServices");
const imageKafkaServices=require("../servicesKafka/imagesServices")
const { checkAuth } = require('../config/passport')

const {
   POST_IMAGE_USER_PROFILE,
   POST_IMAGE_STUDENT_PROFILE
} = require("../config/routeConstants")



if (process.env.KAFKA_SWITCH === 'true') {
   console.log("in kafka service")

imageRouter.route(POST_IMAGE_USER_PROFILE).post(checkAuth, imageKafkaServices.uploadCompanyProfileImage)
imageRouter.route(POST_IMAGE_STUDENT_PROFILE).post(checkAuth, imageKafkaServices.uploadStudentProfileImage)
}
else{
   imageRouter.route(POST_IMAGE_USER_PROFILE).post(checkAuth, imageServices.uploadCompanyProfileImage)
    imageRouter.route(POST_IMAGE_STUDENT_PROFILE).post(checkAuth, imageServices.uploadStudentProfileImage)
}

module.exports = imageRouter;