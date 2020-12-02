
const { response, application } = require('express');
const mongoose = require('mongoose');
const con = require('../config/mongoConnection');
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
const { populate } = require('../models/Applications');
const Applications = require('../models/Applications');

// const redisClient = require('../config/redisConnection');
const Jobs = require('../models/Jobs');

module.exports.postApplication = (req, res) => {
    console.log("Inside Application POST service");
    console.log(req.body)
    let data = req.body
    let count = null
    Applications.countDocuments({ studentId: data.studentId }, (err, res) => {
        if (res) {
            count = res
            console.log(count + "count" + res)

        }
    }).then(() => {
        console.log(count + "count")
        if (count > 0) {
            console.log("Application exists already")
            res.status(RES_INTERNAL_SERVER_ERROR).end("Already Applied!");

        }
        else {
            let application = Applications({
                studentId: data.studentId,
                jobId: data.jobId,
                appliedDate: Date.now(),
                applicationstatus: "Applied",
                status: "Submitted",
                resume: mongoose.Types.ObjectId()
            })
            application.save((err, result) => {

                if (err) {
                    console.log("Error creating application")
                    console.log(err);
                    //res.setHeader(CONTENT_TYPE, APP_JSON);
                    res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
                }
                else {
                    // console.log(JSON.stringify(result));
                    //res.setHeader(CONTENT_TYPE, APP_JSON);
                    Jobs.findOneAndUpdate({ _id: data.jobId }, { $push: { 'applications': result._id } }, (error, results) => {
                        if (error) {
                            console.log("Error Updating Jobs with application id")
                            console.log(error);
                            //res.setHeader(CONTENT_TYPE, APP_JSON);
                            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                        }
                        else {
                            // console.log(JSON.stringify(result));
                            //res.setHeader(CONTENT_TYPE, APP_JSON);
                            console.log("Application created Successfully");
                            console.log(result);
                            res.status(RES_SUCCESS).send(result);
                        }
                    })

                }
            })
        }
    })
}


module.exports.getApplicationsByJobId = async (req, res) => {

    console.log("Inside Applications Jobs GET service");
    let data = req.query
    console.log(data)
    try {

        let applications
        await Applications.find({ jobId: data.jobId })
            .limit(data.limit * 1).skip((data.page - 1) * data.limit)
            // .populate({ path: 'jobId', model: 'Jobs' })
            .populate({ path: 'studentId', model: 'Student' })
            // .populate({ path: 'resume', model: 'Resume' })
            .exec((err, results) => {
                if (err) {
                    console.log("Error Fetching Applications with job id")
                    console.log(err);
                    //res.setHeader(CONTENT_TYPE, APP_JSON);
                    res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
                }
                else {
                    console.log(results)

                    Applications.countDocuments({ jobId: data.jobId }, (err, count) => {
                        const result = ({
                            results,
                            totalPages: Math.ceil(count / data.limit),
                            currentPage: data.page
                        });
                        console.log("Applications fetched successfully from DB")
                        res.status(RES_SUCCESS).send(result);
                    })
                }
            });

    }
    catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
}


module.exports.putApplications = async (req, res) => {

    console.log("Inside Applications PUT service");
    let data = req.body
    console.log(data)
    let applicationstatus
    if (data.status === "Submitted" || data.status === "Reviewed" || data.status === "Initial Screening" || data.status === "Interviewing") {
        applicationstatus = "Applied"

    }
    else if (data.status === "Hired") {
        applicationstatus = "Selected"

    }
    else if (data.status === "Rejected") {
        applicationstatus = "Rejected"
    }
    try {
        Applications.findOneAndUpdate({ _id: data.applicationId }, { status: data.status, applicationstatus: applicationstatus }, (err, result) => {
            if (err) {
                console.log("Error Updating application status")
                console.log(err);
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
            }
            else {
                // console.log(JSON.stringify(result));
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                console.log("Application updated Successfully");
                console.log(result);
                res.status(RES_SUCCESS).send(result);
            }
        })

    }
    catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
}