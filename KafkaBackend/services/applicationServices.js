const mongoose = require("mongoose");
const Company = require('../models/Company');
const Applications = require('../models/Applications');
function handle_request(msg, callback) {

    console.log("Inside Application Services ->kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "GET_APPLICATIONS_JOBID":
            {
                let data = msg.body
                let apps
                console.log(data)


                Applications.find({ jobId: data.jobId })
                    .limit(data.limit * 1).skip((data.page - 1) * data.limit)
                    // .populate({ path: 'jobId', model: 'Jobs' })
                    .populate({ path: 'studentId', model: 'Student' })
                    // .populate({ path: 'resume', model: 'Resume' })
                    .exec((err, results) => {
                        if (err) {
                            console.log("Error Fetching Applications with job id")
                            console.log(err);
                            callback(err, 'Error')
                        }
                        else {
                            apps = results
                            Applications.countDocuments({ jobId: data.jobId }, (err2, count) => {
                                if (err2) {
                                    console.log("Error counting Applications with job id")
                                    console.log(err2);
                                    callback(err2, 'Error')
                                }
                                else {
                                    let result = ({
                                        results: apps,
                                        totalPages: Math.ceil(count / data.limit),
                                        currentPage: data.page
                                    });
                                    console.log(result)
                                    console.log("Applications fetched successfully from DB")
                                    callback(null, result)
                                }
                            })
                        }
                    });
                break;
            }
        case "PUT_APPLICATION":
            {
                let data = msg.body
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
                            callback(err, 'Error')
                        }
                        else {

                            console.log("Application updated Successfully");
                            console.log(result);
                            callback(null, result)
                        }
                    })

                }
                catch {
                    if (err) {
                        console.log(err);
                        callback(err, 'Error')
                    }
                }
                break;
            }
        case "POST_APPLICATION":
            {
                let data = msg.body
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
                        callback(err, 'Already Applied')

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
                                callback(err, 'Error')
                            }
                            else {

                                Jobs.findOneAndUpdate({ _id: data.jobId }, { $push: { 'applications': result._id } }, (error, results) => {
                                    if (error) {
                                        console.log("Error Updating Jobs with application id")
                                        console.log(error);
                                        callback(err, 'Error')
                                    }
                                    else {
                                        console.log("Application created Successfully");
                                        console.log(result);
                                        callback(null, result)
                                    }
                                })

                            }
                        })
                    }
                })

                break;
            }
        default:
            {
                console.log("Default switch")
            }

    }
};



exports.handle_request = handle_request;