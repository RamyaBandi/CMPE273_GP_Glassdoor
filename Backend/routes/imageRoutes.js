const express = require("express");
const imageRouter = express.Router();
const imageServices = require("../servicesMongo/imageServices");
//const imagekafkaServices=require("../servicesKafka/imageServices")

const {
   POST_IMAGE_USER_PROFILE,
   POST_IMAGE_STUDENT_PROFILE
} = require("../config/routeConstants")

imageRouter.route(POST_IMAGE_USER_PROFILE).post(imageServices.uploadCompanyProfileImage)
imageRouter.route(POST_IMAGE_STUDENT_PROFILE).post(imageServices.uploadStudentProfileImage)

module.exports = imageRouter;