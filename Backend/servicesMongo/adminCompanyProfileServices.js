const { response } = require('express');
const con = require('../config/mongoConnection');
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
const Jobs = require('../models/Jobs');
const Reviews = require('../models/Reviews');
const Students = require('../models/Student');

module.exports.getAllCompanies = async (req, res) => {
    console.log("Inside Admin Companies GET service");
    console.log(req.query);
    let data = req.query;
    try {
        data.page = 1;
        data.limit = 10;
        const companies = await Company.find().limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
        const count = await Company.countDocuments();
        const result = ({
            companies,
            totalPages: Math.ceil(count / data.limit),
            currentPage: data.page
        });
        console.log("Companies fetched successfully from DB");
        res.status(RES_SUCCESS).send(result);
    }
    catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
}

module.exports.getCompanyByCompanyName = async (req, res) => {
    console.log("Inside Admin Company using Company Name GET service");
    console.log(req.query);
    let data = req.query;
    try {
        data.page = 1;
        data.limit = 10;
        const company = await Company.find({ companyName: data.companyName }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
        const count = await Company.countDocuments({ companyName: data.companyName });
        const result = ({
            company,
            totalPages: Math.ceil(count / data.limit),
            currentPage: data.page
        });
        console.log("Companies fetched successfully using Company Name from DB");
        res.status(RES_SUCCESS).send(result);
    }
    catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
}

module.exports.getCompanyReviews = async (req, res) => {
    console.log("Inside Admin Company Reviews GET service");
    let data = req.query;
    console.log(data);
    try {
        data.page = 1;
        data.limit = 10;
        const reviews = await Reviews.find({ companyId: data.companyId, approvalstatus: data.approvalstatus }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
        const count = await Reviews.countDocuments({ companyId: data.companyId, approvalstatus: data.approvalstatus });
        const result = ({
            reviews,
            totalPages: Math.ceil(count / data.limit),
            currentPage: data.page
        });
        console.log("Reviews fetched successfully from DB");
        res.status(RES_SUCCESS).send(result);
    }
    catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
}

module.exports.getCompanyJobDetails = async (req, res) => {
    console.log("Inside Admin Company Job Details GET service");
    let data = req.query;
    console.log(data);
    try {
        data.page = 1;
        data.limit = 10;
        const applications = await Applications.find({ companyId: data.companyId, approvalstatus: data.approvalstatus }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
        const count = await Reviews.countDocuments({ companyId: data.companyId, approvalstatus: data.approvalstatus });
        const result = ({
            applications,
            totalPages: Math.ceil(count / data.limit),
            currentPage: data.page
        });
        console.log("Jobs fetched successfully from DB");
        res.status(RES_SUCCESS).send(result);
    }
    catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
}