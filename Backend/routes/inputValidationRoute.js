const express = require("express");
const validationRouter = express.Router();
const validationServices = require("../servicesSQL/inputValidationServices");

const { FETCH_CUSTOMERINPUT } = require('../config/routeConstants');

validationRouter.route(FETCH_CUSTOMERINPUT).get(validationServices.validate);


module.exports = validationRouter;