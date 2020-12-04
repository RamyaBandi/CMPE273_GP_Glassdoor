const express = require("express");
const photoRouter = express.Router();
const photoServices = require("../servicesMongo/photoServices");
const {checkAuth}=require("../config/passport")
const photoKafkaServices = require("../servicesKafka/photoServices");
const { GET_COMPANY_PHOTOS, POST_COMPANY_PHOTOS, GET_ALL_PHOTOS, PUT_PHOTO_APPROVE, PUT_PHOTO_REJECT } = require('../config/routeConstants');

// console.log(process.env.KAFKA_SWITCH);
if (process.env.KAFKA_SWITCH === 'true') {
    photoRouter.route(POST_COMPANY_PHOTOS).post(checkAuth, photoServices.postCompanyPhotos);
    photoRouter.route(GET_COMPANY_PHOTOS).get(checkAuth, photoServices.getCompanyPhotos);
    photoRouter.route(GET_ALL_PHOTOS).get(checkAuth, photoServices.getAllPhotos);
    photoRouter.route(PUT_PHOTO_APPROVE).put(checkAuth, photoServices.putPhotoApprove);
    photoRouter.route(PUT_PHOTO_REJECT).put(checkAuth, photoServices.putPhotoReject);
}
else {
    photoRouter.route(POST_COMPANY_PHOTOS).post(checkAuth, photoServices.postCompanyPhotos);
    photoRouter.route(GET_COMPANY_PHOTOS).get(checkAuth, photoServices.getCompanyPhotos);
    photoRouter.route(GET_ALL_PHOTOS).get(checkAuth, photoServices.getAllPhotos);
    photoRouter.route(PUT_PHOTO_APPROVE).put(checkAuth, photoServices.putPhotoApprove);
    photoRouter.route(PUT_PHOTO_REJECT).put(checkAuth, photoServices.putPhotoReject);

}

module.exports = photoRouter;