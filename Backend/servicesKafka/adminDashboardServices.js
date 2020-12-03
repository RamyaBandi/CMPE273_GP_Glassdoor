const { response } = require('express');
const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR
} = require("../config/routeConstants");

const Company = require('../models/Company');
const Salaries = require('../models/Salaries')
const Jobs = require('../models/Jobs')
const Interviews = require('../models/Interviews')
const Reviews = require('../models/Reviews');
const Students = require('../models/Student')
const CompanyViews = require('../models/CompanyViews')

// Get count of  reviews per day

module.exports.reviewsperday = async (req, res) => {
    data = {
        api: "GET_REVIEWS_PER_DAY",
    }
    kafka.make_request('adminanalytics', data, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("In error");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        } else {
            console.log("In else");
            res.status(RES_SUCCESS).send(JSON.stringify(results));
        }

    });
}

// Top 5 most reviewed company

module.exports.topreviewedcompanies = async (req, res) => {
    data = {
        api: "GET_TOP_REVIEWED_COMPANIES",
    }
    kafka.make_request('adminanalytics', data, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("In error");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        } else {
            console.log("In else");
            res.status(RES_SUCCESS).send(JSON.stringify(results));
        }

    });
}

// Top 5 company based on average rating

module.exports.averageratedcompanies = async (req, res) => {
    data = {
        api: "GET_TOP_AVERAGE_RATED_COMPANIES",
    }
    kafka.make_request('adminanalytics', data, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("In error");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        } else {
            console.log("In else");
            res.status(RES_SUCCESS).send(JSON.stringify(results));
        }

    });
}

// Top 5 students based on total accepted reviews made.

module.exports.topstudentratings = async (req, res) => {
    data = {
        api: "GET_TOP_STUDENTS_ON_RATING",
    }
    kafka.make_request('adminanalytics', data, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("In error");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        } else {
            console.log("In else");
            res.status(RES_SUCCESS).send(JSON.stringify(results));
        }

    });
}


// Top 10 CEO’s based on rating.

module.exports.topceorating = async (req, res) => {
    data = {
        api: "GET_TOP_CEO_RATING",
    }
    kafka.make_request('adminanalytics', data, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("In error");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        } else {
            console.log("In else");
            res.status(RES_SUCCESS).send(JSON.stringify(results));
        }

    });
}

// Top 10 company based on viewed per day.

module.exports.topcompanyviews = async (req, res) => {
    data = {
        api: "GET_TOP_COMPANY_VIEWS",
        date: req.query.date
    }
    kafka.make_request('adminanalytics', data, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("In error");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        } else {
            console.log("In else");
            res.status(RES_SUCCESS).send(JSON.stringify(results));
        }

    });
}