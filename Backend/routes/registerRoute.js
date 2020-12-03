const express = require("express");
const registerRouter = express.Router();
const registerKafkaServices = require('../servicesKafka/registerServices')
const registerServices = require("../servicesSQL/registerServices");

const { POST_REGISTER } = require('../config/routeConstants');

if (process.env.KAFKA_SWITCH === 'true') {
    console.log("in kafka service")
    registerRouter.route(POST_REGISTER).post(registerKafkaServices.register);
}
else {
    registerRouter.route(POST_REGISTER).post(registerServices.register);
}


module.exports = registerRouter;