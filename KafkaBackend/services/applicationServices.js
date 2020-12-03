const mongoose = require("mongoose");
const Company = require('../models/Company');
const Applications = require('../models/Applications');
async function handle_request(msg, callback) {

    console.log("Inside Application Services ->kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "GET_APPLICATIONS_JOBID":
            {
                try {

                    let data = msg.body
                    console.log(data)
                    //let applications
                    const applications= await Applications.find({ jobId: data.jobId }).limit(data.limit * 1).skip((data.page - 1) * data.limit).populate({ path: 'studentId', model: 'Student' }).exec();
                    const count=  await Applications.countDocuments({ jobId: data.jobId })
                    console.log(applications)
                    const result = ({
                        applications,
                        totalPages: Math.ceil(count / data.limit),
                        currentPage: data.page
                    });
                    console.log("Applications fetched successfully from DB")
                  callback(null, result);        
                }
                catch {
                    if (err) {
                        console.log(err);
                        //res.setHeader(CONTENT_TYPE, APP_JSON);
                        callback(err, 'Error')
                    }
                }
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
        case "GET_APPLICATIONS_STUDENTID":
            {
                let data = msg.body
                try {

                    Applications.find({ studentId: data.studentId })
                        .limit(data.limit * 1).skip((data.page - 1) * data.limit)
                        .populate({ path: 'jobId', model: 'Jobs', select: 'companyName jobTitle postedDate industry responsibilities country remote streetAddress city state  zip averageSalary' })
                        // .populate({ path: 'studentId', model: 'Student' })
                        // .populate({ path: 'resume', model: 'Resume' })
                        .exec(async (err, results) => {
                            if (err) {
                                console.log("Error Fetching Applications with student id")
                                console.log(err);
                                //res.setHeader(CONTENT_TYPE, APP_JSON);
                                callback(err, 'Error')
                            }
                            else {
                                // console.log(results)

                                await Applications.countDocuments({ studentId: data.studentId }, (err, count) => {
                                    const result = ({
                                        results,
                                        totalPages: Math.ceil(count / data.limit),
                                        currentPage: data.page
                                    });
                                    console.log("Applications fetched successfully from DB")
                                    callback(null, result)
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
                break;
            }
        default:
            {
                console.log("Default switch")
            }

    }
};



exports.handle_request = handle_request;