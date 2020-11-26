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
        data.page = 1;
        data.limit = 10;
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
            "Interviews fetched Successfully from DB - page not 1 or redis off"
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
