const express = require("express");
const companyRouter = express.Router();
const companyServices = require("../servicesMongo/companyServices");
const companykafkaServices = require("../servicesKafka/companyServices")
//const {checkAuth}=require("../config/passport")
const {
	PUT_COMPANY_SIGNUP, POST_COMPANY_SIGNUP, GET_COMPANY_DETAILS, GET_COMPANY_SIGNUP, POST_COMPANYVIEWS, PUT_FEATURED_REVIEWS } = require("../config/routeConstants")
if (process.env.KAFKA_SWITCH === 'true') {
	companyRouter.route(PUT_COMPANY_SIGNUP).put(companykafkaServices.updateCompanyProfile);
	companyRouter.route(POST_COMPANY_SIGNUP).post(companykafkaServices.createCompanyProfile);
	companyRouter.route(GET_COMPANY_DETAILS).get(companykafkaServices.getCompanyProfile);
	companyRouter.route(GET_COMPANY_SIGNUP).get(companykafkaServices.getUpdatedCompanyProfile);
	companyRouter.route(POST_COMPANYVIEWS).post(companykafkaServices.postCompanyView)
	companyRouter.route(PUT_FEATURED_REVIEWS).put(companykafkaServices.updateCompanyFeatured)
}
else {
	companyRouter.route(PUT_COMPANY_SIGNUP).put(companyServices.updateCompanyProfile);
	companyRouter.route(POST_COMPANY_SIGNUP).post(companyServices.createCompanyProfile);
	companyRouter.route(GET_COMPANY_DETAILS).get(companyServices.getCompanyProfile);
	companyRouter.route(GET_COMPANY_SIGNUP).get(companyServices.getUpdatedCompanyProfile);
	companyRouter.route(POST_COMPANYVIEWS).post(companyServices.postCompanyView)
	companyRouter.route(PUT_FEATURED_REVIEWS).put(companyServices.updateCompanyFeatured)
}
module.exports = companyRouter;