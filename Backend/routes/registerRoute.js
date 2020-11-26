const express = require("express");
const registerRouter = express.Router();
const registerServices = require("../servicesSQL/registerServices");

const { POST_REGISTER } = require('../config/routeConstants');

registerRouter.route(POST_REGISTER).post(registerServices.register);


module.exports = registerRouter;