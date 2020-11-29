const express = require("express");
const adminAnalyticsRouter = express.Router();
const adminAnalyticsServices = require("../servicesMongo/adminDashboardServices");

const { GET_REVIEWS_PER_DAY, GET_TOP_REVIEWED_COMPANIES, GET_TOP_AVERAGE_RATED_COMPANIES, GET_TOP_STUDENTS_ON_RATING,GET_TOP_CEO_RATING,GET_TOP_COMPANY_VIEWS  } = require('../config/routeConstants');

adminAnalyticsRouter.route(GET_REVIEWS_PER_DAY).get(adminAnalyticsServices.reviewsperday);

adminAnalyticsRouter.route(GET_TOP_REVIEWED_COMPANIES).get(adminAnalyticsServices.topreviewedcompanies);

adminAnalyticsRouter.route(GET_TOP_AVERAGE_RATED_COMPANIES).get(adminAnalyticsServices.averageratedcompanies);

adminAnalyticsRouter.route(GET_TOP_STUDENTS_ON_RATING).get(adminAnalyticsServices.topstudentratings);

adminAnalyticsRouter.route(GET_TOP_CEO_RATING).get(adminAnalyticsServices.topceorating);

adminAnalyticsRouter.route(GET_TOP_COMPANY_VIEWS).get(adminAnalyticsServices.topcompanyviews);

module.exports = adminAnalyticsRouter;