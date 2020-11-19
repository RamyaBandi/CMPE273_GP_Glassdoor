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
        website: data.website,
        companySize: data.companySize,
        companyType: data.companyType,
        revenue: data.revenue,
        headquarters: data.headquarters,
        industry: data.industry,
        mission: data.mission,
        description: data.description,
        ceoName: data.ceoName,
    }
    Company.findByIdAndUpdate(data.company_id , company_update, (err, result) => {
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

    console.log("Inside Company Profile GET service");
    console.log(req.query)
    let data = req.query
    let companyDetails = Company.find({ _id: data.company_id }).exec((err, result) => {

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