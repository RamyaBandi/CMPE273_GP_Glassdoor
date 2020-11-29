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

module.exports.jobSearch = async (req, res) => {
    console.log("Search",req.query.searchParameter)
    let jobsData = await Jobs.find({ jobTitle: { '$regex': req.query.searchParameter, '$options': 'i' } }, 
    { 'companyId': 1, 'jobTitle': 1, 'streetAddress':1, 'city' : 1, 'state':1, 'zip' : 1});
    console.log("Jobs Data", jobsData)

    let datasets = await Promise.all(jobsData.map(async (data) => {
        let products = {};

        let companyResults = await Company.aggregate([
            { $match: { _id: data.companyId } },
            {
                $project: {
                    _id: 1,
                    companyName: 1,
                    headquarters: 1,
                    website: 1,
                    NumberOfReviews: { $size: "$reviews" },
                    // salaryReviews:  { $size: "$salaries" },
                    // interviewReviews: { $size: "$interviews" }
                }
            }]).exec();


        let averageRating = await Reviews.aggregate([
            { $group: { _id: data.companyId, averageRating: { $avg: "$overallRating" } } }]).exec();


        products._id = companyResults[0]._id;
        products.companyName = companyResults[0].companyName
        products.headquarters = companyResults[0].headquarters
        products.website = companyResults[0].website
        products.NumberOfReviews = companyResults[0].NumberOfReviews
        products.salaryReviews = companyResults[0].salaryReviews
        products.interviewReviews = companyResults[0].interviewReviews
        products.averageRating = Math.round(averageRating[0].averageRating*Math.pow(10, 2)) / Math.pow(10, 2);
        products.jobTitle = data.jobTitle;
        products.streetAddress = data.streetAddress;
        products.city = data.city;
        products.state = data.state;
        products.zip = data.zip;


        return products;
    }));

    console.log("Outside jobs", datasets)
    res.status(RES_SUCCESS).end(JSON.stringify(datasets));
}
// }
module.exports.companySearch = async (req, res) => {

    let companyResults = await
        Company.aggregate([
            { $match: { companyName: req.query.searchParameter } },
            {
                $project: {
                    _id: 1,
                    companyName: 1,
                    headquarters: 1,
                    website: 1,
                    NumberOfReviews: "$reviews" ? { $size: "$reviews" } : null,
                    salaryReviews: "$salaries" ? { $size: "$salaries" } : null,
                    interviewReviews: "$interviews" ? { $size: "$interviews" } : null
                }
            }]).exec();

    let averageRating = await Reviews.aggregate([
        { $group: { _id: companyResults[0]._id, averageRating: { $avg: "$overallRating" } } }]).exec();
    console.log("Average Rating", averageRating)

    companyResults[0].averageRating = Math.round(averageRating[0].averageRating*Math.pow(10, 2)) / Math.pow(10, 2);

    res.status(RES_SUCCESS).end(JSON.stringify(companyResults[0]));

}

module.exports.salarySearch = async (req, res) => {
    let companyResults = await
        Company.aggregate([
            { $match: { companyName: req.query.searchParameter} },
            {
                $project: {
                    _id: 1,
                    companyName: 1,
                    headquarters: 1,
                    website: 1,
                    salaries: 1,
                    NumberOfReviews: "$reviews" ? { $size: "$reviews" } : null,
                    salaryReviews: "$salaries" ? { $size: "$salaries" } : null,
                    interviewReviews: "$interviews" ? { $size: "$interviews" } : null
                }
            }]).exec();

    let averageRating = await Reviews.aggregate([
        { $group: { _id: companyResults[0]._id, averageRating: { $avg: "$overallRating" } } }]).exec();
    console.log("Average Rating", averageRating)

    let datasets = await Promise.all(companyResults[0].salaries.map(async (data) => {
        let products = {};

        let last = await Salaries.find({ _id: data }, { jobTitle: 1, baseSalary: 1 })

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
    }));

    console.log("Outside salaries", datasets)


    res.status(RES_SUCCESS).end(JSON.stringify(datasets));
}

module.exports.interviewSearch = async (req, res) => {
    let companyResults = await
        Company.aggregate([
            { $match: { companyName: req.query.searchParameter } },
            {
                $project: {
                    _id: 1,
                    companyName: 1,
                    headquarters: 1,
                    website: 1,
                    interviews: 1,
                    NumberOfReviews: "$reviews" ? { $size: "$reviews" } : null,
                    salaryReviews: "$salaries" ? { $size: "$salaries" } : null,
                    interviewReviews: "$interviews" ? { $size: "$interviews" } : null
                }
            }]).exec();

    let averageRating = await Reviews.aggregate([
        { $group: { _id: companyResults[0]._id, averageRating: { $avg: "$overallRating" } } }]).exec();
    console.log("Average Rating", averageRating)

    let datasets = await Promise.all(companyResults[0].interviews.map(async (data) => {
        let products = {};

        let last = await Interviews.find({ _id: data }, { jobTitle: 1, description: 1 })

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
    }));

    console.log("Outside salaries", datasets)


    res.status(RES_SUCCESS).end(JSON.stringify(datasets));

}