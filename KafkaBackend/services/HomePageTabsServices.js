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
const Reviews = require('../models/Reviews');


function handle_request(msg, callback) {
    console.log("Page limit",req.query.limit )
    console.log("Page Number",req.query.page )
    let companyResults = await
        Company.aggregate([
            {
                $project: {
                    _id: 1,
                    companyName: 1,
                    headquarters: 1,
                    website: 1,
                    salaries: 1,
                    NumberOfReviews: { $size: { "$ifNull": [ "$reviews", [] ] } },
                    salaryReviews: { $size: { "$ifNull": [ "$salaries", [] ] } },
                    interviewReviews: { $size: { "$ifNull": [ "$interviews", [] ] } }
                }
            }]).exec();

            console.log("Company results", companyResults)


    let datasets = await Promise.all(companyResults.map(async (data) => {
        let products = {};

        let averageRating = await Reviews.aggregate([
            { $group: { _id: data._id, averageRating: { $avg: "$overallRating" } } }]).limit(req.query.limit * 1).exec();

        
        products._id = data._id;
        products.companyName = data.companyName
        products.headquarters =  data.headquarters
        products.website = data.website
        products.NumberOfReviews = data.NumberOfReviews
        products.salaryReviews = data.salaryReviews
        products.interviewReviews = data.interviewReviews
        if(averageRating === undefined || averageRating.length == 0){
            products.averageRating = 0;
            
        }
        else{
            products.averageRating = Math.round(averageRating[0].averageRating*Math.pow(10, 2)) / Math.pow(10, 2);
        }
        // products.averageRating = Math.round(averageRating[0].averageRating*Math.pow(10, 2)) / Math.pow(10, 2);

        return products;
        }
    ));
    datasets = await datasets.filter(company => {
        return company
    })
    console.log("Outside salaries", datasets)

    callback(null, datasets)
    // res.status(RES_SUCCESS).end(JSON.stringify(datasets));
}

