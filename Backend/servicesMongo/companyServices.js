const { response } = require('express');
const con = require('../config/mongoConnection');
const Company = require('../models/Company');
const CompanyViews = require('../models/CompanyViews')
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

module.exports.createCompanyProfile = (req, res) => {
    console.log("Inside Company Profile POST service");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body
    let company = Company({
        companyName: data.companyName,
        email: data.email
    })
    company.save((err, result) => {
        if (err) {
            console.log("Error creating company profile" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Created Company Profile : " + JSON.stringify(result))
            res.status(200).end(JSON.stringify(result))
        }
    })
}



module.exports.updateCompanyProfile = (req, res) => {
    console.log("Inside Company Profile PUT service");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body

    let company_update = {
        companyName: data.companyName,
        website: data.Website,
        companySize: data.companySize,
        companyType: data.companyType,
        revenue: data.revenue,
        headquarters: data.headquarters,
        industry: data.industry,
        mission: data.mission,
        description: data.description,
        ceoName: data.ceoName,
    }
    Company.findByIdAndUpdate(data.companyId, company_update, (err, result) => {
        if (err) {
            console.log("Error updating company profile" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Update Company Profile : " + JSON.stringify(result))
            res.status(200).end(JSON.stringify(result))
        }
    })
}

module.exports.getCompanyProfile = (req, res) => {

    console.log("Inside Company Updated Profile GET service");
    console.log(req.query)
    let data = req.query
    let companyDetails = Company.find({ _id: data.companyId }).exec((err, result) => {

        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else {
            // console.log(JSON.stringify(result));
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            console.log("Company Details fetched Successfully");
            console.log(result);
            res.status(RES_SUCCESS).send(result);
        }
    })
}

module.exports.getUpdatedCompanyProfile = (req, res) => {

    console.log("Inside Company Profile GET service");
    console.log(req.query)
    let data = req.query
    let companyDetails = Company.find({ _id: data.companyId }).exec((err, result) => {

        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else {
            // console.log(JSON.stringify(result));
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            console.log("Company Details fetched Successfully");
            console.log(result);
            res.status(RES_SUCCESS).send(result);
        }
    })
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

module.exports.postCompanyView = (req, res) => {
    let date = Date()
    console.log("Date", date)
    console.log("Date after formatting", formatDate(date))
    console.log("Inside Company Profile POST views");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body
    let companyviews = CompanyViews({
        companyId : data.companyId,
        companyName: data.companyName,
        Date : formatDate(date)
        // email: data.email
    })
    companyviews.save((err, result) => {
        if (err) {
            console.log("Error saving views" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Saved company view : " + JSON.stringify(result))
            res.status(200).end(JSON.stringify(result))
        }
    })
}


module.exports.updateCompanyFeatured = (req, res) => {
    console.log("Inside Company Featured review PUT service");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body

    let featured_update = {
        
        featuredReview: data.featuredId
    }
    //console.log(featured_update)
    Company.findByIdAndUpdate(data.companyId, {$push:featured_update}, (err, result) => {
        //console.log(result.featuredReview)
        //console.log(result._id)
        if (err) {
            console.log("Error updating company profile" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Update Company Featured Reviews : " + JSON.stringify(result.featuredReview))
            res.status(200).end(JSON.stringify(result.featuredReview))
        }
    })
}