const express = require("express");
const photoRouter = express.Router();
const photoServices = require("../servicesMongo/photoServices");
//const {checkAuth}=require("../config/passport")
const photoKafkaServices = require("../servicesKafka/photoServices");
const { GET_COMPANY_PHOTOS, POST_COMPANY_PHOTOS, GET_ALL_PHOTOS, PUT_PHOTO_APPROVE, PUT_PHOTO_REJECT } = require('../config/routeConstants');

// console.log(process.env.KAFKA_SWITCH);
if (process.env.KAFKA_SWITCH === 'true') {
    photoRouter.route(POST_COMPANY_PHOTOS).post(photoKafkaServices.postCompanyPhotos);
    photoRouter.route(GET_COMPANY_PHOTOS).post(photoKafkaServices.getCompanyPhotos);
    photoRouter.route(GET_ALL_PHOTOS).get(photoKafkaServices.getAllPhotos);
    photoRouter.route(PUT_PHOTO_APPROVE).put(photoKafkaServices.putPhotoApprove);
    photoRouter.route(PUT_PHOTO_REJECT).put(photoKafkaServices.putPhotoReject);
}
else {
    photoRouter.route(POST_COMPANY_PHOTOS).post(photoServices.postCompanyPhotos);
    photoRouter.route(GET_COMPANY_PHOTOS).get(photoServices.getCompanyPhotos);
    photoRouter.route(GET_ALL_PHOTOS).get(photoServices.getAllPhotos);
    photoRouter.route(PUT_PHOTO_APPROVE).put(photoServices.putPhotoApprove);
    photoRouter.route(PUT_PHOTO_REJECT).put(photoServices.putPhotoReject);

}

module.exports = photoRouter;