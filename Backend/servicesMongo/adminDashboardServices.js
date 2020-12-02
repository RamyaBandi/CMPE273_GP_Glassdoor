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
const Students = require('../models/Student')
const CompanyViews = require('../models/CompanyViews')

// Get count of  reviews per day

module.exports.reviewsperday = async (req, res) => {
    // let getreviewsperday = await Reviews.aggregate([{"$group" : {_id: {"reviewDate":"$reviewDate"}, count:{$sum:1}}}]).exec();
    let getreviewsperday = await Reviews.aggregate([
        {"$group" : {_id: {$dateToString: { format: "%Y-%m-%d", date: "$reviewDate" }},
         count:{$sum:1}}},
         { "$sort": { _id: 1 } },
         { "$limit": 10 }]).exec();
    console.log("Reviews", getreviewsperday)
    getreviewsperday = getreviewsperday.filter(company => company._id !== null)
    console.log("After filter", getreviewsperday)

    res.status(RES_SUCCESS).end(JSON.stringify(getreviewsperday));
}

// Top 5 most reviewed company

module.exports.topreviewedcompanies= async (req, res) => {
    let gettopreviewedcompanies = await Reviews.aggregate([
        {"$group" : {_id: {"company_id":"$company_id"}, count:{$sum:1}}},
        // {"$group" :{"company_id":"$company_id"}, count:{$sum:1}},
        { "$sort": { count: -1 } },
        { "$limit": 5 },
    ]).exec();
    // console.log(gettopreviewedcompanies[0]._id.company_id)
    
    gettopreviewedcompanies = gettopreviewedcompanies.filter(company => company._id.company_id !== null)
    console.log("After filter", gettopreviewedcompanies)

    let datasets = await Promise.all(gettopreviewedcompanies.map(async (data) => {
        let products = {};
        console.log("Data",data)
        console.log("Data",data._id.company_id)
        let getcompanydata = await Company.aggregate([
            
            { $match: { _id: data._id.company_id } },
            {
                $project: {
                    _id: 1,
                    companyName: 1,
                }
            }]).exec();
            products.companyId = data._id.company_id;
            products.companyName = getcompanydata[0].companyName;
            products.noOfReviews = data.count;

            return products;
    }))
    res.status(RES_SUCCESS).end(JSON.stringify(datasets));
}

// Top 5 company based on average rating

module.exports.averageratedcompanies = async (req, res) => {
    let gettopaverageratedcompanies = await Reviews.aggregate([
        {"$group" : {_id: {"company_id":"$company_id"}, averageRating:{$avg: "$overallRating"}}},
        // {"$group" :{"company_id":"$company_id"}, count:{$sum:1}},
        { "$sort": { averageRating: -1 } },
        { "$limit": 5 },
    ]).exec();
    // console.log(gettopaverageratedcompanies[0]._id.company_id)
    
    gettopaverageratedcompanies = gettopaverageratedcompanies.filter(company => company._id.company_id !== null)
    console.log("After filter", gettopaverageratedcompanies)

    let datasets = await Promise.all(gettopaverageratedcompanies.map(async (data) => {
        let products = {};
        console.log("Data",data)
        console.log("Data",data._id.company_id)
        let getcompanydata = await Company.aggregate([
            
            { $match: { _id: data._id.company_id } },
            {
                $project: {
                    _id: 1,
                    companyName: 1,
                }
            }]).exec();
            products.companyId = data._id.company_id;
            products.companyName = getcompanydata[0].companyName;
            products.avgRating = Math.round(data.averageRating*Math.pow(10, 2)) / Math.pow(10, 2);
            
            return products;
    }))
    res.status(RES_SUCCESS).end(JSON.stringify(datasets));
}

// Top 5 students based on total accepted reviews made.

module.exports.topstudentratings = async (req, res) => {
    let getTopStudentratings = await Reviews.aggregate([
        {"$group" : {_id: {"student_id":"$student_id"}, count:{$sum:1}}},
        // {"$group" :{"company_id":"$company_id"}, count:{$sum:1}},
        { "$sort": { count: -1 } },
        { "$limit": 5 },
    ]).exec();
    // console.log(getTopStudentratings[0]._id.company_id)
    
    getTopStudentratings = getTopStudentratings.filter(student => student._id.student_id !== null)
    console.log("After filter", getTopStudentratings)

    let datasets = await Promise.all(getTopStudentratings.map(async (data) => {
        let products = {};
        console.log("Data",data)
        let getStudentData = await Students.aggregate([
            
            { $match: { _id: data._id.student_id } },
            {
                $project: {
                    _id: 1,
                    studentName: 1,
                }
            }]).exec();
            products.studentId = data._id.student_id;
            products.studentName = getStudentData[0].studentName;
            products.noOfReviews = data.count;

            return products;
    }))
    res.status(RES_SUCCESS).end(JSON.stringify(datasets));
}


// Top 10 CEO’s based on rating.

module.exports.topceorating= async (req, res) => {
    // ,"companyName":"$companyName"
    let getTopCeo = await Reviews.aggregate([
        
        {"$group" : {_id: {"company_id":"$company_id"}, averageCeoRating:{$avg: "$ceoRating"}}},
        // {"$group" :{"company_id":"$company_id"}, count:{$sum:1}},
        { "$sort": { count: 1 } },
        { "$limit": 10 },
    ]).exec();
    // console.log(getTopCeo[0]._id.company_id)
    
    getTopCeo = getTopCeo.filter(company => company._id.company_id !== null)
    console.log("After filter", getTopCeo)

    let datasets = await Promise.all(getTopCeo.map(async (data) => {
        let products = {};
        console.log("Data",data)
        console.log("Data",data._id.company_id)
        let getcompanydata = await Company.aggregate([
            
            { $match: { _id: data._id.company_id } },
            {
                $project: {
                    _id: 1,
                    companyName: 1,
                    ceoName : 1
                }
            }]).exec();
            products.companyId = data._id.company_id;
            products.companyName = getcompanydata[0].companyName;
            products.ceoName = getcompanydata[0].ceoName;
            products.averageCeoRating = data.averageCeoRating;

            return products;
    }))
    res.status(RES_SUCCESS).end(JSON.stringify(datasets));
}

// Top 10 company based on viewed per day.

module.exports.topcompanyviews = async (req, res) => {
    console.log("Date",req.query.date)
    let getviewsperday = await CompanyViews.aggregate([
        {$match : {Date:req.query.date}},
        {"$group" : {_id: {"companyName": "$companyName"},
        // {"$group" : {_id: {$dateToString: { format: "%Y-%m-%d", date: "$Date" }},
         count:{$sum:1}}},

         { "$sort": { _id: -1 } },
         { "$limit": 10 }]).exec();

    // let getviewsperday = await CompanyViews.find({})

    console.log("Reviews", getviewsperday)
    res.status(RES_SUCCESS).end(JSON.stringify(getviewsperday));
}