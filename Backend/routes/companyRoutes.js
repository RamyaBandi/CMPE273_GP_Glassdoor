const express = require("express");
const companyRouter = express.Router();
const companyServices = require("../servicesMongo/companyServices");
const companykafkaServices=require("../servicesKafka/companyServices")
//const {checkAuth}=require("../config/passport")
const {
  PUT_COMPANY_SIGNUP, POST_COMPANY_SIGNUP, GET_COMPANY_DETAILS
} = require("../config/routeConstants")

companyRouter.route(PUT_COMPANY_SIGNUP).put(companykafkaServices.updateCompanyProfile);
companyRouter.route(POST_COMPANY_SIGNUP).post(companyServices.createCompanyProfile);
companyRouter.route(GET_COMPANY_DETAILS).get(companyServices.getCompanyProfile);

module.exports = companyRouter;