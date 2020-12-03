const express = require("express");
const adminCompanyProfileRouter = express.Router();
const adminCompanyProfileServices = require("../servicesMongo/adminCompanyProfileServices");
const adminCompanyProfileKafkaServices = require("../servicesKafka/adminCompanyProfileServices");
const { GET_ALL_COMPANIES_ADMIN, GET_COMPANY_BY_COMPANYNAME_ADMIN, GET_COMPANY_REVIEWS_ADMIN } = require("../config/routeConstants");

// console.log(process.env.KAFKA_SWITCH);
if (process.env.KAFKA_SWITCH === 'true') {
    adminCompanyProfileRouter.route(GET_ALL_COMPANIES_ADMIN).get(adminCompanyProfileKafkaServices.getAllCompanies);
    adminCompanyProfileRouter.route(GET_COMPANY_BY_COMPANYNAME_ADMIN).get(adminCompanyProfileKafkaServices.getCompanyByCompanyName);
    adminCompanyProfileRouter.route(GET_COMPANY_REVIEWS_ADMIN).get(adminCompanyProfileKafkaServices.getCompanyReviews);
}
else {
    adminCompanyProfileRouter.route(GET_ALL_COMPANIES_ADMIN).get(adminCompanyProfileServices.getAllCompanies);
    adminCompanyProfileRouter.route(GET_COMPANY_BY_COMPANYNAME_ADMIN).get(adminCompanyProfileServices.getCompanyByCompanyName);
    adminCompanyProfileRouter.route(GET_COMPANY_REVIEWS_ADMIN).get(adminCompanyProfileServices.getCompanyReviews);
}

module.exports = adminCompanyProfileRouter;