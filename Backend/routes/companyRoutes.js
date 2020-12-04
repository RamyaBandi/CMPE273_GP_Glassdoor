const express = require("express");
const companyRouter = express.Router();
const companyServices = require("../servicesMongo/companyServices");
const companykafkaServices = require("../servicesKafka/companyServices")
const { checkAuth } = require('../config/passport')
const {
	PUT_COMPANY_SIGNUP, POST_COMPANY_SIGNUP, GET_COMPANY_DETAILS, GET_COMPANY_SIGNUP, POST_COMPANYVIEWS, PUT_FEATURED_REVIEWS } = require("../config/routeConstants")
if (process.env.KAFKA_SWITCH === 'true') {
	companyRouter.route(PUT_COMPANY_SIGNUP).put(checkAuth, companykafkaServices.updateCompanyProfile);
	companyRouter.route(POST_COMPANY_SIGNUP).post(checkAuth, companykafkaServices.createCompanyProfile);
	companyRouter.route(GET_COMPANY_DETAILS).get(checkAuth, companyServices.getCompanyProfile);
	companyRouter.route(GET_COMPANY_SIGNUP).get(checkAuth, companykafkaServices.getUpdatedCompanyProfile);
	companyRouter.route(POST_COMPANYVIEWS).post(checkAuth, companykafkaServices.postCompanyView)
	companyRouter.route(PUT_FEATURED_REVIEWS).put(checkAuth, companykafkaServices.updateCompanyFeatured)
}
else {
	companyRouter.route(PUT_COMPANY_SIGNUP).put(checkAuth, companyServices.updateCompanyProfile);
	companyRouter.route(POST_COMPANY_SIGNUP).post(checkAuth, companyServices.createCompanyProfile);
	companyRouter.route(GET_COMPANY_DETAILS).get(checkAuth, companyServices.getCompanyProfile);
	companyRouter.route(GET_COMPANY_SIGNUP).get(checkAuth, companyServices.getUpdatedCompanyProfile);
	companyRouter.route(POST_COMPANYVIEWS).post(checkAuth, companyServices.postCompanyView)
	companyRouter.route(PUT_FEATURED_REVIEWS).put(checkAuth, companyServices.updateCompanyFeatured)
}
module.exports = companyRouter;