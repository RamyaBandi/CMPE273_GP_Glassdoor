//const { response } = require('express');
const mongoose = require("mongoose");
//const con = require('../config/mongoConnection');
const {
  CONTENT_TYPE,
  APP_JSON,
  RES_SUCCESS,
  RES_BAD_REQUEST,
  RES_NOT_FOUND,
  RES_DUPLICATE_RESOURCE,
  TEXT_PLAIN,
  RES_INTERNAL_SERVER_ERROR,
} = require("../config/routeConstants");
const Company = require("../models/Company");
const Interviews = require("../models/Interviews");
const Student = require("../models/Student");

async function handle_request(msg, callback) {
  console.log("Inside Interview Services ->kafka backend");
  console.log(msg);
  switch (msg.api) {
    case "POST_STUDENT_INTERVIEW": {
      let data = msg.body;
      let interviews = Interviews({
        companyId: data.companyId,
        studentId: data.studentId,
        jobTitle: data.jobTitle,
        overallExperience: data.overallExperience,
        description: data.description,
        difficulty: data.difficulty,
        offerStatus: data.offerStatus,
        interviewQnA: data.interviewQnA,
    });
    interviews.save((err, result) => {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            callback(err, 'Error')
        } else {
            // console.log("Interview Doc created : " + JSON.stringify(result));
            Company.findOneAndUpdate(
                { _id: data.companyId },
                { $push: { interviews: result._id } },
                (error, results) => {
                    if (error) {
                        console.log("Error adding interview to company" + error);
                        callback(error, 'Error')
                    } else {
                        Student.findOneAndUpdate(
                            { _id: data.studentId },
                            { $push: { interviews: result._id } },
                            (error2, results2) => {
                                if (error2) {
                                    console.log("Error adding interview to Student" + error2);
                                    callback(error2, 'Error')
                                } else {
                                    console.log("Interview inserted Successfully");
                                    callback(null, results2)
                                }
                            }
                        );
                    }
                }
            );
        }
    });
    break;
    }
    case "GET_COMPANY_INTERVIEWS": {
      console.log("inside get company interviews -> kafka backend");
      let data = msg.body;
      console.log(data);
      try {
        // data.page = 1;
        // data.limit = 10;
        const interviews = await Interviews.find({ companyId: data.companyId })
            .limit(data.limit * 1)
            .skip((data.page - 1) * data.limit)
            .exec();
        const count = await Interviews.countDocuments({
            companyId: data.companyId,
        });
        const result = {
            interviews,
            totalPages: Math.ceil(count / data.limit),
            currentPage: data.page,
        };
        console.log(
            "Interviews fetched Successfully"
        );
        callback(null, result)
        } 
        catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            callback(err, 'Error')
            }
        }
    }

    case "GET_STUDENT_INTERVIEWS": {
      console.log("inside get student salaries -> kafka backend");
      let data = msg.body;
      console.log(data);
      let interviews = Student.find({ _id: data.studentId })
        .select("interviews")
        .populate("interviews")
        .limit(data.limit * 1)
        .skip((data.page - 1) * data.limit)
        .exec((err, result) => {
            if (err) {
                console.log(err);
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                callback(err, 'Error')
            } else {
                // console.log(JSON.stringify(result));
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                console.log("Interviews fetched Successfully");
                callback(null, result)
            }
        });
      break;
    }

    case "GET_COMPANY_INTERVIEW_STATISTICS": {
        console.log("inside get student salaries -> kafka backend");
        let data = msg.body;
        console.log(data);
        try {
        const interviews = await Interviews.find({ companyId: data.companyId })
            .exec();
        const totalCount = await Interviews.countDocuments({
            companyId: data.companyId,
        });
        const positiveCount = await Interviews.countDocuments({ companyId: data.companyId, overallExperience: +1 }).exec();
        const positivePercentage = (positiveCount / totalCount) * 100;
        const negativeCount = await Interviews.countDocuments({ companyId: data.companyId, overallExperience: -1 }).exec();
        const negativePercentage = (negativeCount / totalCount) * 100;
        const neutralCount = await Interviews.countDocuments({ companyId: data.companyId, overallExperience: 0 }).exec();
        const neutralPercentage = (neutralCount / totalCount) * 100;

        const easyCount = await Interviews.countDocuments({ companyId: data.companyId, difficulty: "Easy" }).exec();
        const easyPercentage = (easyCount / totalCount) * 100;
        const averageCount = await Interviews.countDocuments({ companyId: data.companyId, difficulty: "Average" }).exec();
        const averagePercentage = (averageCount / totalCount) * 100;
        const difficultCount = await Interviews.countDocuments({ companyId: data.companyId, difficulty: "Difficult" }).exec();
        const difficultPercentage = (difficultCount / totalCount) * 100;

        const acceptedCount = await Interviews.countDocuments({ companyId: data.companyId, offerStatus: "Accepted" }).exec();
        const acceptedPercentage = (acceptedCount / totalCount) * 100;
        const rejectedCount = await Interviews.countDocuments({ companyId: data.companyId, offerStatus: "Rejected" }).exec();
        const rejectedPercentage = (rejectedCount / totalCount) * 100;

        const result = {
            positivePercentage,
            neutralPercentage,
            negativePercentage,
            easyPercentage,
            averagePercentage,
            difficultPercentage,
            acceptedPercentage,
            rejectedPercentage
        };
        callback(null, result)
        console.log(result);
    } catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            callback(err, 'Error')
        }
    }
        break;
      }

    default: {
      console.log("Default switch");
    }
  }
}

exports.handle_request = handle_request;
