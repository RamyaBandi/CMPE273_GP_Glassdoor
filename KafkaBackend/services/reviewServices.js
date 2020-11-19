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
    RES_INTERNAL_SERVER_ERROR
} = require("../config/routeConstants");
const Company = require('../models/Company');
const Reviews = require('../models/Reviews');
const Student = require('../models/Student')

function handle_request(msg, callback) {

    console.log("Inside Review Services ->kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "POST_STUDENT_REVIEW":
            {
                let data = msg.body
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
                        callback(err, 'Error')
                    }
                    else {
            
                        console.log("Review Doc created : " + JSON.stringify(result));
                        Company.findOneAndUpdate({ _id: data.company_id }, { $push: { "reviews": result._id } }, (err, res) => {
                            if (err) {
                                console.log("Error adding review to company" + err)
                                callback(err, 'Error')
            
                            }
                            else {
                                //res.setHeader(CONTENT_TYPE, APP_JSON);
                                console.log("Review inserted Successfully")
                                callback(null, result)
                            }
                        })
            
            
            
                    }
                })
                break;
            }
        case "GET_COMPANY_REVIEWS":
    {
    let data = msg.body
    let reviews = Company.find({ _id: data.company_id }).select('reviews').populate('reviews').exec((err, result) => {

        if (err) {
            console.log(err);
    
            callback(err, 'Error')
        }
        else {
    
            console.log("Reviews fetched Successfully")
            callback(null, result)
        }
    })
                    break;
    }


    case "GET_STUDENT_REVIEWS":
    {
    console.log("inside get student reviews")
    let data = msg.body
    console.log(data)
    let reviews = Student.find({ _id: data.student_id }).select('companyReviews').populate('companyReviews').exec((err, result) => {
        console.log("hitting mongo")

        if (err) {
            console.log(err);
            callback(err, 'Error')
        }
        else {
        
            console.log("Reviews fetched Successfully")
            callback(null, result)
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