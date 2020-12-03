const express = require("express");
const imageRouter = express.Router();
const imageServices = require("../servicesMongo/imageServices");
const imagekafkaServices=require("../servicesKafka/imagesServices")

const {
   POST_IMAGE_USER_PROFILE,
   POST_IMAGE_STUDENT_PROFILE
} = require("../config/routeConstants")



if (process.env.KAFKA_SWITCH === 'true') {
   console.log("in kafka service")

imageRouter.route(POST_IMAGE_USER_PROFILE).post(imageKafkaServices.uploadCompanyProfileImage)
imageRouter.route(POST_IMAGE_STUDENT_PROFILE).post(imageKafkaServices.uploadStudentProfileImage)
}
else{
   imageRouter.route(POST_IMAGE_USER_PROFILE).post(imageServices.uploadCompanyProfileImage)
    imageRouter.route(POST_IMAGE_STUDENT_PROFILE).post(imageServices.uploadStudentProfileImage)
}

module.exports = imageRouter;