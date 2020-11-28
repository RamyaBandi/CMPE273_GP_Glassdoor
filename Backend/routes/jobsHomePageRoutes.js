const express = require("express");
const jobsRouter = express.Router();
const jobsServices = require("../servicesMongo/jobsHomePageServices");

const { GET_JOBS_HOMEPAGE } = require('../config/routeConstants');

jobsRouter.route(GET_JOBS_HOMEPAGE).get(jobsServices.jobsHomePage);

// jobsRouter.route().get(jobsServices.jobsHomePage);

module.exports = jobsRouter;