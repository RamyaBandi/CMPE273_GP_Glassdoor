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
    RES_INTERNAL_SERVER_ERROR,
    POST_COMPANY_SIGNUP,
    PUT_COMPANY_SIGNUP
} = require("../config/routeConstants");
const Company = require('../models/Company');
//const Reviews = require('../models/Reviews');
//const Student = require('../models/Student')

function handle_request(msg, callback) {

    console.log("Inside Company Services ->kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "POST_COMPANY_SIGNUP":
            {
                let data = msg.body
                let company = Company({
                    companyName: data.companyName,
                    email: data.email
                })
                company.save((err, result) => {
                    if (err) {
                        console.log("Error creating company profile" + err)
                        callback(err, 'Error')
                    }
                    else {
                        console.log("Created Company Profile : " + JSON.stringify(result))
                        callback(null, result)
                    }
                })
                break;
            }
        case "PUT_COMPANY_SIGNUP":
    {
        let data = msg.body

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
            callback(err, 'Error')
        }
        else {
            console.log("Update Company Profile : " + JSON.stringify(result))
            callback(null, result)
        }
    })
        
                    break;
    }  
    case "POST_COMPANYVIEWS": {
        let company = new Company({
            companyId :msg.companyId,
            companyName: msg.companyName,
            Date : msg.Date
        })
        company.save((err, result) => {
            if (err) {
                console.log("Error creating company profile" + err)
                callback(err, 'Error')
            }
            else {
                console.log("Created Company Profile : " + JSON.stringify(result))
                callback(null, result)
            }
        })
    }      
        default:
            {
                console.log("Default switch")
            }

    }
};

exports.handle_request = handle_request;