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


const Reviews = require('../models/Reviews')

module.exports.postStudentReview = (req, res) => {

    console.log("Inside Reviews POST service");
    console.log(req.body)
    let data = req.body
    let reviews = Reviews({
        company_id: data.company_id,
        student_id: data.student_id,
        headline: data.headline,
        description: data.description,
        pros: data.pros,
        cons: data.cons,
        approvalstatus: "Under Review",
        helpfulCount: 0,
        overallRating: data.overallRating,
        recommendedRating: data.recommendedRating,
        ceoRating: data.ceoRating,
    })
    reviews.save((err, result) => {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else {

            console.log("Review Doc created : " + JSON.stringify(result));
            Company.findOneAndUpdate({ _id: data.company_id }, { $push: { "reviews": result._id } }, (err, res) => {
                if (err) {
                    console.log("Error adding review to company" + err)
                    res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));

                }
                else {
                    //res.setHeader(CONTENT_TYPE, APP_JSON);
                    console.log("Review inserted Successfully")
                    res.status(RES_SUCCESS).send();
                }
            })



        }
    })
}


module.exports.getCompanyReviews = (req, res) => {

    console.log("Inside Company Reviews GET service");
    console.log(req.query)
    let data = req.query
    let reviews = Company.find({ _id: data.company_id }).select('reviews').populate('reviews').exec((err, result) => {

        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else {
            // console.log(JSON.stringify(result));
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            console.log("Reviews fetched Successfully")
            res.status(RES_SUCCESS).send(result);
        }
    })
}


module.exports.getStudentReviews = (req, res) => {

    console.log("Inside Student Reviews GET service");
    console.log(req.query)
    let data = req.query
    let reviews = Student.find({ _id: data.student_id }).select('companyReviews').populate('companyReviews').exec((err, result) => {

        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else {
            // console.log(JSON.stringify(result));
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            console.log("Reviews fetched Successfully")
            res.status(RES_SUCCESS).send(result);
        }
    })
}