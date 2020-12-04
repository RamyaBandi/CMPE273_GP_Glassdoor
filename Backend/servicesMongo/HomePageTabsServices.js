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
const Salaries = require('../models/Salaries')
const Jobs = require('../models/Jobs')
const Interviews = require('../models/Interviews')
const Reviews = require('../models/Reviews');
const salaryRouter = require('../routes/salaryRoutes');

// }
module.exports.companyHomePage = async (req, res) => {

    let companyResults = await
        Company.aggregate([
            {
                $project: {
                    _id: 1,
                    companyName: 1,
                    headquarters: 1,
                    website: 1,
                    // NumberOfReviews: "$reviews" ? { $size: "$reviews" } : null,
                    NumberOfReviews: { $size: { "$ifNull": [ "$reviews", [] ] } },
                    salaryReviews: { $size: { "$ifNull": [ "$salaries", [] ] } },
                    interviewReviews: { $size: { "$ifNull": [ "$interviews", [] ] } }
                }
            }]).exec();

    companyResults = companyResults.filter(company =>{
        return company
    })

    let averageRating = await Reviews.aggregate([
        { $group: { _id: companyResults[0]._id, averageRating: { $avg: "$overallRating" } } }]).limit(req.query.limit * 1).skip((req.query.page - 1) * req.query.limit).exec();
    console.log("Average Rating", averageRating)

    averageRating = averageRating.filter(rating => {return rating})

    companyResults[0].averageRating = Math.round(averageRating[0].averageRating*Math.pow(10, 2)) / Math.pow(10, 2);

    res.status(RES_SUCCESS).end(JSON.stringify(companyResults[0]));

}

module.exports.salaryHomePage = async (req, res) => {
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
            }]).skip((req.query.page - 1) * req.query.limit).exec();

    let averageRating = await Reviews.aggregate([
        { $group: { _id: companyResults[0]._id, averageRating: { $avg: "$overallRating" } } }]).limit(req.query.limit * 1).exec();
    console.log("Average Rating", averageRating)

    let datasets = await Promise.all(companyResults[0].salaries.map(async (data) => {
        let products = {};

        let last = await Salaries.find({ _id: data }, { jobTitle: 1, baseSalary: 1 })
        console.log("Last", last[0])

        if(typeof last[0] !== "undefined"){
        products._id = companyResults[0]._id;
        products.companyName = companyResults[0].companyName
        products.headquarters = companyResults[0].headquarters
        products.website = companyResults[0].website
        products.NumberOfReviews = companyResults[0].NumberOfReviews
        products.salaryReviews = companyResults[0].salaryReviews
        products.interviewReviews = companyResults[0].interviewReviews
        products.averageRating = Math.round(averageRating[0].averageRating*Math.pow(10, 2)) / Math.pow(10, 2);
        products.jobTitle = last[0].jobTitle;
        products.baseSalary = last[0].baseSalary;


        return products;
        }
    }));
    datasets = await datasets.filter(company => {
        return company.companyName
    })
    console.log("Outside salaries", datasets)


    res.status(RES_SUCCESS).end(JSON.stringify(datasets));
}

module.exports.interviewHomePage = async (req, res) => {
    let companyResults = await
        Company.aggregate([
            {
                $project: {
                    _id: 1,
                    companyName: 1,
                    headquarters: 1,
                    website: 1,
                    interviews: 1,
                    NumberOfReviews: { $size: { "$ifNull": [ "$reviews", [] ] } },
                    salaryReviews: { $size: { "$ifNull": [ "$salaries", [] ] } },
                    interviewReviews: { $size: { "$ifNull": [ "$interviews", [] ] } }
                }
            }]).limit(req.query.limit * 1).skip((req.query.page - 1) * req.query.limit).exec();

    let averageRating = await Reviews.aggregate([
        { $group: { _id: companyResults[0]._id, averageRating: { $avg: "$overallRating" } } }]).exec();
    console.log("Average Rating", averageRating)

    let datasets = await Promise.all(companyResults[0].interviews.map(async (data) => {
        let products = {};

        let last = await Interviews.find({ _id: data }, { jobTitle: 1, description: 1 })
        console.log("Last", last)
        if(typeof last[0] !== "undefined"){
        products._id = companyResults[0]._id;
        products.companyName = companyResults[0].companyName
        products.headquarters = companyResults[0].headquarters
        products.website = companyResults[0].website
        products.NumberOfReviews = companyResults[0].NumberOfReviews
        products.salaryReviews = companyResults[0].salaryReviews
        products.interviewReviews = companyResults[0].interviewReviews
        products.averageRating = Math.round(averageRating[0].averageRating*Math.pow(10, 2)) / Math.pow(10, 2);
        products.jobTitle = last[0].jobTitle;
        products.description = last[0].description;

        return products;
        }
    }));
    datasets = await datasets.filter(company => {
        return company
    })

    console.log("Outside interviews", datasets)


    res.status(RES_SUCCESS).end(JSON.stringify(datasets));

}