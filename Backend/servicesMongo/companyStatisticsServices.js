const Jobs = require('../models/Jobs');
const Company = require('../models/Company');

const Applications = require('../models/Applications')
const { response } = require('express');
const con = require('../config/mongoConnection');
const mongoose = require('mongoose')
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



module.exports.getJobsCount = async (req, res) => {

    console.log("Inside Company Jobs Statistics GET service");
    let data = req.query
    console.log(data)
    const jobs = await Jobs.countDocuments({ companyId: data.companyId })
        .exec((err, result) => {
            if (err) {
                console.log("Error fetching job count")
                console.log(err);
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
            }
            else {
                // console.log(JSON.stringify(result));
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                console.log("Jobs Counted Successfully");
                console.log(result);
                res.status(RES_SUCCESS).end(JSON.stringify(result));

            }
        });

}


module.exports.getApplicantsCount = (req, res) => {

    console.log("Inside Company Jobs Statistics GET service");
    let data = req.query
    console.log(data)

    Company.find({ _id: data.companyId }, 'jobs')
        .exec((err, jobList) => {
            if (err) {
                console.log("Error fetching job count")
                console.log(err);
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
            }
            else {
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                console.log("Jobs retrieved Successfully");
                console.log(jobList[0].jobs);
                Applications
                    // .find({ _id: { $in: [...appList] } }, '_id')
                    // .populate({ path: 'studentId', model: 'Student', select: ['race', 'gender', 'veteranStatus', 'disability'] })
                    .aggregate([
                        { $match: { jobId: { $in: jobList[0].jobs } } },
                        // { $project: { status: 1, applicationstatus: 1 } },
                        { $group: { _id: "$applicationstatus", count: { "$sum": 1 } } }
                    ])
                    .exec((err, applications) => {
                        if (err) {
                            console.log("Error fetching Applications")
                            console.log(err);
                            //res.setHeader(CONTENT_TYPE, APP_JSON);
                            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
                        }
                        else {

                            console.log("Demographics Counted Successfully");
                            // console.log(applications);
                            let out = {
                                'Applied': 0,
                                'Selected': 0,
                                'Rejected': 0
                            }
                            applications.map((stat) => {
                                if (stat._id === "Applied") {
                                    out.Applied = stat.count
                                }
                                else if (stat._id === "Selected") {
                                    out.Selected = stat.count
                                }
                                else if (stat._id === "Rejected") {
                                    out.Rejected = stat.count
                                }
                            })

                            res.status(RES_SUCCESS).end(JSON.stringify(out));

                        }
                    })
            }
        })

}

module.exports.getApplicationDemographics = async (req, res) => {

    console.log("Inside Company Jobs Demographics GET service");
    let data = req.query
    console.log(data)

    Company.find({ _id: data.companyId }, 'jobs')
        .exec((err, jobList) => {
            if (err) {
                console.log("Error fetching job count")
                console.log(err);
                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
            }
            else {
                console.log("Jobs retrieved Successfully");
                console.log(jobList[0].jobs);
                Applications
                    .aggregate([
                        { $match: { jobId: { $in: jobList[0].jobs } } },
                        {
                            $lookup:
                            {
                                from: "students",
                                localField: "studentId",
                                foreignField: "_id",
                                as: "student"
                            }
                        },
                        { $project: { student: { race: 1, gender: 1, veteranStatus: 1, disability: 1 }, _id: 0 } },
                        { $group: { _id: "$student", "doc": { "$first": "$$ROOT" } } },
                        { $replaceRoot: { "newRoot": "$doc" } }
                    ])
                    .exec((err, applications) => {
                        if (err) {
                            console.log("Error fetching Applications")
                            console.log(err);
                            //res.setHeader(CONTENT_TYPE, APP_JSON);
                            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
                        }
                        else {
                            let race = {
                                'American Indian or Alaska Native': 0,
                                'Asian': 0,
                                'Black or African American': 0,
                                'Native Hawaiian or Other Pacific Islander': 0,
                                'White': 0,
                                'Hispanic or Latino': 0,
                                'Do not wish to Disclose': 0
                            }
                            let gender = {
                                'Male': 0,
                                'Female': 0,
                                'Other': 0,
                                'Do not wish to Disclose': 0
                            }
                            let veteranStatus = {
                                'Not a Veteran': 0,
                                'Veteran': 0,
                                'Do not wish to Disclose': 0
                            }
                            let disability = {
                                'Have a Disability': 0,
                                'Do not have a Disability': 0,
                                'Do not wish to Disclose': 0
                            }
                            applications.map((app) => {
                                // console.log(app.student[0])
                                // console.log(app.student[0].race)
                                race[app.student[0].race] = race[app.student[0].race] + 1
                                gender[app.student[0].gender] = gender[app.student[0].gender] + 1
                                veteranStatus[app.student[0].veteranStatus] = veteranStatus[app.student[0].veteranStatus] + 1
                                disability[app.student[0].disability] = disability[app.student[0].disability] + 1

                            })
                            // console.log(races)
                            console.log("Demographics Counted Successfully");
                            // console.log(applications);
                            let out = {
                                race: race,
                                gender: gender,
                                veteranStatus: veteranStatus,
                                disability: disability
                            }
                            res.status(RES_SUCCESS).end(JSON.stringify(out));

                        }
                    })
                // console.log(JSON.stringify(appList));
            }
            // res.status(RES_SUCCESS).end(JSON.stringify(jobList));

            // }
        })


}


// module.exports.getApplicationDemographics = async (req, res) => {

//     console.log("Inside Company Jobs Demographics GET service");
//     let data = req.query
//     console.log(data)

//     Applications.aggregate([
        // {
        //     $lookup:
        //     {
        //         from: "Student",
        //         localField: "studentId",
        //         foreignField: "_id",
        //         as: "Student"
        //     }
        // },
//         { $unwind: "$Student" },
//         {
//             $project: {
//                 "race": "$Student.race"
//             }
//         }
//     ])
//         .exec((err, apps) => {
//             res.end(JSON.stringify(apps))
//         })

//     // console.log(jobsList)    })



// }