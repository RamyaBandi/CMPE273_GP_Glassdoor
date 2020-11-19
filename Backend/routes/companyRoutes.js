const express = require("express");
const companyRouter = express.Router();
const companyServices = require("../servicesMongo/companyServices");
const companykafkaServices=require("../servicesKafka/companyServices")
//const {checkAuth}=require("../config/passport")
const {
  PUT_COMPANY_SIGNUP, POST_COMPANY_SIGNUP
} = require("../config/routeConstants")

companyRouter.route(PUT_COMPANY_SIGNUP).put(companykafkaServices.updateCompanyProfile);
companyRouter.route(POST_COMPANY_SIGNUP).post(companyServices.createCompanyProfile);


module.exports = companyRouter;