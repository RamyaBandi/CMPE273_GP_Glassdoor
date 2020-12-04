const { response } = require('express');
const mongoose = require('mongoose');
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


module.exports.companyHomePage = async (req, res) => {
    console.log("Page limit", req.query.limit)
    console.log("Page Number", req.query.page)

    let companyResults = await
        // Company.aggregate([
        //     {
        //         $project: {
        //             _id: 1,
        //             companyName: 1,
        //             headquarters: 1,
        //             website: 1,
        //             salaries: 1,
        //             NumberOfReviews: { $size: { "$ifNull": ["$reviews", []] } },
        //             salaryReviews: { $size: { "$ifNull": ["$salaries", []] } },
        //             interviewReviews: { $size: { "$ifNull": ["$interviews", []] } }
        //         }
        //     }]).limit(req.query.limit * 1).skip((req.query.page - 1) * req.query.limit).exec();
        Company.find().limit(req.query.limit * 1).skip((req.query.page - 1) * req.query.limit).exec();
    // console.log("Company results", companyResults)


    let datasets = await Promise.all(companyResults.map(async (data) => {
        let products = {};
        console.log(data._id)
        let averageRating = await Reviews.aggregate([
            { $match: { companyId: data._id } },
            {
                $group: {
                    _id: "$companyId",
                    averageRating: { "$avg": "$overallRating" }
                }
            }]).exec();

        console.log(averageRating)
        products._id = data._id;
        products.companyName = data.companyName
        products.headquarters = data.headquarters
        products.website = data.website
        products.NumberOfReviews = data.reviews.length
        products.salaryReviews = data.salaries.length
        products.interviewReviews = data.interviews.length
        if (averageRating === undefined || averageRating.length == 0) {
            products.averageRating = 0;

        }
        else {
            products.averageRating = Math.round(averageRating[0].averageRating * Math.pow(10, 2)) / Math.pow(10, 2);
        }
        // products.averageRating = Math.round(averageRating[0].averageRating*Math.pow(10, 2)) / Math.pow(10, 2);

        return products;
    }
    ));
    // datasets = await datasets.filter(company => {
    //     return company
    // })
    const count = await Company.countDocuments();
    const result = ({
        companies: datasets,
        totalPages: Math.ceil(count / req.query.limit),
        currentPage: req.query.page
    });
    // console.log("Outside salaries", datasets)


    res.status(RES_SUCCESS).end(JSON.stringify(result));
}

