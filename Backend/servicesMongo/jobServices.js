const Jobs = require('../models/Jobs');
const Company = require('../models/Company')
const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR,
    POST_LOGIN
} = require("../config/routeConstants");

module.exports.postJob = (req, res) => {

    console.log("Inside Job POST service");
    console.log(req.body)
    let data = req.body
    let job = Jobs({
        companyId: data.companyId,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        postedDate: Date.now(),
        industry: data.industry,
        responsibilities: data.responsibilities,
        country: data.country,
        remote: data.remote,
        streetAddress: data.streetAddress,
        city: data.city,
        state: data.state,
        zip: data.zip
    })
    job.save((err, result) => {

        if (err) {
            console.log("Error creating job")
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else {
            // console.log(JSON.stringify(result));
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            Company.findOneAndUpdate({ _id: data.companyId }, { $push: { 'jobs': result._id } }, (error, res) => {
                if (error) {
                    console.log("Error Updating Company with job id")
                    console.log(error);
                    //res.setHeader(CONTENT_TYPE, APP_JSON);
                    res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                }
                else {
                    // console.log(JSON.stringify(result));
                    //res.setHeader(CONTENT_TYPE, APP_JSON);
                    console.log("Job created Successfully");
                    console.log(result);
                    res.status(RES_SUCCESS).send(result);
                }
            })

        }
    })
}


module.exports.getAllJobs = (req, res) => {

    console.log("Inside Job GET all service");
    console.log(req.query)
    let data = req.body
    Jobs.find((err, result) => {

        if (err) {
            console.log("Error fetching job")
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else {
            // console.log(JSON.stringify(result));
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            console.log("Jobs fetched Successfully");
            console.log(result);
            res.status(RES_SUCCESS).send(result);
        }
    })
}


module.exports.getJobById = (req, res) => {
    console.log("Inside Job GET by ID service");
    console.log(req.query)
    let data = req.query
    Jobs.find({ companyId: data.companyId }, (err, result) => {

        if (err) {
            console.log("Error fetching job")
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else {
            // console.log(JSON.stringify(result));
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            console.log("Jobs fetched Successfully");
            console.log(result);
            res.status(RES_SUCCESS).send(result);
        }
    })
}