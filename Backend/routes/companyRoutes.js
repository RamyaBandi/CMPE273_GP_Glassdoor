const express = require("express");
const companyRouter = express.Router();
const companyServices = require("../servicesMongo/companyServices");
const companykafkaServices=require("../servicesKafka/companyServices")
//const {checkAuth}=require("../config/passport")
const {
  PUT_COMPANY_SIGNUP, POST_COMPANY_SIGNUP, GET_COMPANY_DETAILS, GET_COMPANY_SIGNUP, POST_COMPANYVIEWS, PUT_FEATURED_REVIEWS } = require("../config/routeConstants")

companyRouter.route(PUT_COMPANY_SIGNUP).put(companyServices.updateCompanyProfile);
companyRouter.route(POST_COMPANY_SIGNUP).post(companyServices.createCompanyProfile);
companyRouter.route(GET_COMPANY_DETAILS).get(companyServices.getCompanyProfile);
companyRouter.route(GET_COMPANY_SIGNUP).get(companyServices.getUpdatedCompanyProfile);
companyRouter.route(POST_COMPANYVIEWS).post(companyServices.postCompanyView)
companyRouter.route(PUT_FEATURED_REVIEWS).put(companyServices.updateCompanyFeatured)

module.exports = companyRouter;