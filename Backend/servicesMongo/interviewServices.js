const { response } = require("express");
const con = require("../config/mongoConnection");
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
const Student = require("../models/Student");
const Interviews = require("../models/Interviews");

module.exports.postStudentInterview = (req, res) => {
    console.log("Inside Interviews POST service");
    console.log(req.body);
    let data = req.body;
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
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        } else {
            // console.log("Interview Doc created : " + JSON.stringify(result));
            Company.findOneAndUpdate(
                { _id: data.companyId },
                { $push: { interviews: result._id } },
                (error, results) => {
                    if (error) {
                        console.log("Error adding interview to company" + error);
                        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                    } else {
                        Student.findOneAndUpdate(
                            { _id: data.studentId },
                            { $push: { interviews: result._id } },
                            (error2, results2) => {
                                if (error2) {
                                    console.log("Error adding interview to Student" + error2);
                                    res
                                        .status(RES_INTERNAL_SERVER_ERROR)
                                        .end(JSON.stringify(error2));
                                } else {
                                    console.log("Interview inserted Successfully");
                                    res.status(RES_SUCCESS).end(JSON.stringify(results2));
                                }
                            }
                        );
                    }
                }
            );
        }
    });
};

module.exports.getCompanyInterviews = async (req, res) => {
    console.log("Inside Company Interviews GET service");
    let data = req.query;
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
        res.status(RES_SUCCESS).send(result);
    } catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
};

module.exports.getStudentInterviews = (req, res) => {
    console.log("Inside Student Interviews GET service");
    console.log(req.query);
    let data = req.query;
    let interviews = Student.find({ _id: data.studentId })
        .select("interviews")
        .populate("interviews")
        .limit(data.limit * 1)
        .skip((data.page - 1) * data.limit)
        .exec((err, result) => {
            if (err) {
                console.log(err);
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
            } else {
                // console.log(JSON.stringify(result));
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                console.log("Interviews fetched Successfully");
                res.status(RES_SUCCESS).send(result);
            }
        });
};

module.exports.getInterviewStatistics = async (req, res) => {
    console.log("Inside Company Interviews Experience Rating in Percentage GET service");
    let data = req.query;
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
        res.status(RES_SUCCESS).send(result);
        console.log(result);
    } catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
};
