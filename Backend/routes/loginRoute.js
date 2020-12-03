const express = require("express");
const loginRouter = express.Router();
const loginServices = require("../servicesSQL/loginServices");
const loginKafkaServices = require('../servicesKafka/loginServices')

const { POST_LOGIN } = require('../config/routeConstants');

if (process.env.KAFKA_SWITCH === 'true') {

        loginRouter.route(POST_LOGIN).post(loginKafkaServices.login);
}
else {
    loginRouter.route(POST_LOGIN).post(loginServices.login);
}

module.exports = loginRouter;