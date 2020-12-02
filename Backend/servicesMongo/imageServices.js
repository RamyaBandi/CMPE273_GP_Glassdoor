const { response } = require('express');
const con = require('../config/mongoConnection');
const Company = require('../models/Company');
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


module.exports.uploadCompanyProfileImage = (req, res) => {
    console.log("Inside POST company profile picture service");
    console.log("req body" + JSON.stringify(req.body));
    // let data = req.body
    // let company = Company({
    //     companyName: data.companyName,
    //     email: data.email
    // })
    // company.save((err, result) => {
    //     if (err) {
    //         console.log("Error creating company profile" + err)
    //         res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    //     }
    //     else {
    //         console.log("Created Company Profile : " + JSON.stringify(result))
    //         res.status(200).end(JSON.stringify(result))
    //     }
    // })
}

module.exports.uploadStudentProfileImage = (req, res) => {
    console.log("Inside POST Student profile picture service");
    console.log("req body" + JSON.stringify(req.body));
    // let data = req.body
    // let company = Company({
    //     companyName: data.companyName,
    //     email: data.email
    // })
    // company.save((err, result) => {
    //     if (err) {
    //         console.log("Error creating company profile" + err)
    //         res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    //     }
    //     else {
    //         console.log("Created Company Profile : " + JSON.stringify(result))
    //         res.status(200).end(JSON.stringify(result))
    //     }
    // })
}