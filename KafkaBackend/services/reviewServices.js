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
const redisClient = require('../config/redisConnection')

function handle_request(msg, callback) {

    //console.log("Inside Review Services ->kafka backend");
    //console.log(msg);
    switch (msg.api) {
        case "POST_STUDENT_REVIEW":
            {
                let data = msg.body
                let reviews = Reviews({
                    companyId: data.companyId,
                    studentId: data.studentId,
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
                        Company.findOneAndUpdate({ _id: data.companyId }, { $push: { "reviews": result._id } }, (error, results) => {
                            if (error) {
                                console.log("Error adding review to company" + error)
                                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                            }
                            else {
                                Student.findOneAndUpdate({ _id: data.studentId }, { $push: { "companyReviews": result._id } }, (error2, results2) => {
                                    if (error2) {
                                        console.log("Error adding review to Student" + error2)
                                        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error2));
                                    }
                                    else {
                                        console.log("Kafka - Review inserted Successfully")
                                        res.status(RES_SUCCESS).end(JSON.stringify(results2));
                                    }
                                })
            
                            }
                        })
            
                    }
                })
                break;
            }
        case "GET_COMPANY_REVIEWS":
    {
    let data = msg.body
    if (process.env.REDIS_SWITCH == "true" && data.page == 1) {
        try {
            redisClient.get('topReviews', async (err, redisout) => {
                // If value for key is available in Redis
                //console.log("in redis get")
                //console.log(err)
                

                if (redisout !== null) {
                    // send data as output
                    console.log("Data exists in redis")
                    // console.log(redisout.length)
                    Company.countDocuments({ type: 'reviews' }, (err, count) => {
                        if (err) {
                            console.log(err);
                            
                            callback(err, 'Error')
                        }
                        else {
                            // console.log("in company countdocuments")
                            let output = {
                                reviews: JSON.parse(redisout),
                                totalPages: Math.ceil(count / data.limit),
                                currentPage: data.page
                            }
                            callback(null, output)
                        }
                    })



                }
                // If value for given key is not available in Redis
                else {
                    // Fetch data from your database
                    let reviews = Company.find({ _id: data.company_id }).select('reviews').populate('reviews').limit(data.limit * 1).skip((data.page - 1) * data.limit).exec((error, result) => {

                        if (error) {
                            console.log(error);
                         
                            callback(err, 'Error')
                        }
                        else {
                      
                            redisClient.setex('topReviews', 36000, JSON.stringify(result[0].reviews));
                            // console.log("Reviews fetched Successfully")
                            callback(null, result)
                        }
                    })

                }
            })
        } catch (error) {
            // Handle error
            // console.log("Error while working with redis")
            console.log(error);

            let reviews = Company.find({ _id: data.company_id }).select('reviews').populate('reviews').limit(data.limit * 1).skip((data.page - 1) * data.limit).exec((err, result) => {

                if (err) {
                    console.log(err);
                    callback(err, 'Error')
                }
                else {

                    console.log("Reviews fetched Successfully from DB")
                    callback(null, result)
                }
            })
        }

    }
    else {
        let reviews = Company.find({ _id: data.company_id }).select('reviews').populate('reviews').limit(data.limit * 1).skip((data.page - 1) * data.limit).exec((err, result) => {

            if (err) {
                console.log(err);
                callback(err, 'Error')
            }
            else {

                // console.log("Reviews fetched Successfully from DB - page not 1 or redis off")
                callback(null, result)
            }
        })
    }
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