const express = require("express");
const photoRouter = express.Router();
const photoServices = require("../servicesMongo/photoServices");
//const {checkAuth}=require("../config/passport")
//const photoKafkaServices = require("../servicesKafka/photoServices");
const { GET_COMPANY_PHOTOS, POST_COMPANY_PHOTOS } = require('../config/routeConstants');

// console.log(process.env.KAFKA_SWITCH);
if (process.env.KAFKA_SWITCH === 'true') {
}
else {
    photoRouter.route(POST_COMPANY_PHOTOS).post(photoServices.postCompanyPhotos);
    photoRouter.route(GET_COMPANY_PHOTOS).get(photoServices.getCompanyPhotos);
}

module.exports = photoRouter;