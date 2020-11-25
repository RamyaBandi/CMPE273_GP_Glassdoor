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
const Student = require('../models/Student');
const Jobs = require('../models/Jobs');
const redisClient = require('../config/redisConnection');

module.exports.postCompanyJob = (req, res) => {
    console.log("Inside Jobs POST service");
    console.log(req.body)
    let data = req.body
    let jobs = Jobs({
        companyId: data.companyId,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        postedDate: data.postedDate,
        industry: data.industry,
        responsibilities: data.responsibilities,
        country: data.country,
        remote: data.remote,
        streetAddress: data.streetAddress,
        city: data.city,
        state: data.state,
        zip: data.zip
    })
    jobs.save((err, result) => {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            Company.findOneAndUpdate({ _id: data.companyId }, { $push: { "jobs": result._id } }, (error, results) => {
                if (error) {
                    console.log("Error adding job to company" + error)
                    res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                }
                else {
                    console.log("Job inserted successfully");
                    res.status(RES_SUCCESS).end(JSON.stringify(results));
                }
            })
        }
    })
}

module.exports.getCompanyJobs = async (req, res) => {

    console.log("Inside Company Jobs GET service");
    let data = req.query
    console.log(data)
    try {
        data.page = 1;
        data.limit = 10;
        const jobs = await Jobs.find({ companyId: data.companyId }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
        const count = await Jobs.countDocuments({ companyId: data.companyId });
        const result = ({
            jobs,
            totalPages: Math.ceil(count / data.limit),
            currentPage: data.page
        });
        console.log("Jobs fetched successfully from DB - page not 1 or redis off")
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