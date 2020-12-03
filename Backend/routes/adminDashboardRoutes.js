const express = require("express");
const adminAnalyticsRouter = express.Router();
const adminAnalyticsServices = require("../servicesMongo/adminDashboardServices");
const adminAnalyticsKafkaServices = require("../servicesKafka/adminDashboardServices")

const { GET_REVIEWS_PER_DAY, GET_TOP_REVIEWED_COMPANIES, GET_TOP_AVERAGE_RATED_COMPANIES, GET_TOP_STUDENTS_ON_RATING, GET_TOP_CEO_RATING, GET_TOP_COMPANY_VIEWS } = require('../config/routeConstants');

if (process.env.KAFKA_SWITCH === 'true') {
    adminAnalyticsRouter.route(GET_REVIEWS_PER_DAY).get(adminAnalyticsKafkaServices.reviewsperday);

    adminAnalyticsRouter.route(GET_TOP_REVIEWED_COMPANIES).get(adminAnalyticsKafkaServices.topreviewedcompanies);

    adminAnalyticsRouter.route(GET_TOP_AVERAGE_RATED_COMPANIES).get(adminAnalyticsKafkaServices.averageratedcompanies);

    adminAnalyticsRouter.route(GET_TOP_STUDENTS_ON_RATING).get(adminAnalyticsKafkaServices.topstudentratings);

    adminAnalyticsRouter.route(GET_TOP_CEO_RATING).get(adminAnalyticsKafkaServices.topceorating);

    adminAnalyticsRouter.route(GET_TOP_COMPANY_VIEWS).get(adminAnalyticsKafkaServices.topcompanyviews);
}
else {
    adminAnalyticsRouter.route(GET_REVIEWS_PER_DAY).get(adminAnalyticsServices.reviewsperday);

    adminAnalyticsRouter.route(GET_TOP_REVIEWED_COMPANIES).get(adminAnalyticsServices.topreviewedcompanies);

    adminAnalyticsRouter.route(GET_TOP_AVERAGE_RATED_COMPANIES).get(adminAnalyticsServices.averageratedcompanies);

    adminAnalyticsRouter.route(GET_TOP_STUDENTS_ON_RATING).get(adminAnalyticsServices.topstudentratings);

    adminAnalyticsRouter.route(GET_TOP_CEO_RATING).get(adminAnalyticsServices.topceorating);

    adminAnalyticsRouter.route(GET_TOP_COMPANY_VIEWS).get(adminAnalyticsServices.topcompanyviews);
}


module.exports = adminAnalyticsRouter;