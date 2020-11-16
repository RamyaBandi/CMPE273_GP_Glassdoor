const express = require("express");
const companyRouter = express.Router();
const companyServices = require("../servicesMongo/companyServices");
//const {checkAuth}=require("../config/passport")
const {
  PUT_COMPANY_SIGNUP
} = require("../config/routeConstants")

companyRouter.route(PUT_COMPANY_SIGNUP).put(companyServices.updatecompanyprofile);


module.exports = companyRouter;