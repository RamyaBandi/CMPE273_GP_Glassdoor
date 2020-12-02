const express = require("express");
const adminCompanyProfileRouter = express.Router();
const adminCompanyProfileServices = require("../servicesMongo/adminCompanyProfileServices");
//const adminCompanyProfileKafkaServices = require("../servicesKafka/adminCompanyProfileServices");
const { GET_ALL_COMPANIES, GET_COMPANY_BY_COMPANYNAME, GET_COMPANY_REVIEWS } = require("../config/routeConstants");

// console.log(process.env.KAFKA_SWITCH);
if (process.env.KAFKA_SWITCH === 'true') {
    //jobRouter.route(GET_COMPANY_JOBS).get(jobKafkaServices.getCompanyJobs);
}
else {
    adminCompanyProfileRouter.route(GET_ALL_COMPANIES).get(adminCompanyProfileServices.getAllCompanies);
    adminCompanyProfileRouter.route(GET_COMPANY_BY_COMPANYNAME).get(adminCompanyProfileServices.getCompanyByCompanyName);
    adminCompanyProfileRouter.route(GET_COMPANY_REVIEWS).get(adminCompanyProfileServices.getCompanyReviews);
}

module.exports = adminCompanyProfileRouter;