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


    Jobs.aggregate(
        [
            { $match: { companyId: new mongoose.Types.ObjectId(data.companyId) } },
            { $group: { _id: "$companyId", applications: { $sum: { $size: "$applications" } } } }]
    )
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
                console.log("Applications Counted Successfully");
                console.log(result);
                res.status(RES_SUCCESS).end(JSON.stringify(result));

            }
        });
}

module.exports.getApplicationDemographics = async (req, res) => {

    console.log("Inside Company Jobs Demographics GET service");
    let data = req.query
    console.log(data)


    // await Jobs.aggregate([
    //     { $match: { companyId: new mongoose.Types.ObjectId(data.companyId) } },
    //     { $unwind: "$applications" },
    //     { $project: { applications: 1, _id: 0 } },
    // ])
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

                        // { $unwind: "$studentId" }
                        // { $project: { "userObjId": { "$toObjectId": "$studentId" } } },
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
                            let races = {}
                            let gender = {}
                            let veteranStatus = {}
                            let disability = {}
                            applications.map((app) => {
                                console.log(app.student)
                                let race = app.student.race
                                // races[] = races[app.student.race] + 1
                            })
                            console.log(JSON.stringify(races))
                            console.log("Demographics Counted Successfully");
                            console.log(applications);
                            res.status(RES_SUCCESS).end(JSON.stringify(applications));

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