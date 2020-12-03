const mongoose = require("mongoose");
const Company = require('../models/Company');
const Review = require('../models/Review');

function handle_request(msg, callback) {
    console.log("Inside Admin Company Profile Services -> kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "GET_ALL_COMPANIES_ADMIN":
            {
                let data = msg.body;
                let companies = Company.find().exec((err, result) => {

                    if (err) {
                        callback(err, 'Error')
                    }
                    else {
                        console.log("Companies fetched successfully");
                        console.log(result);
                        callback(null, result)
                    }
                })
                break;
            }
        case "GET_COMPANY_BY_COMPANYNAME_ADMIN":
            {
                let data = msg.body;
                let companies = Company.find({ companyName: data.companyName }).exec((err, result) => {

                    if (err) {
                        callback(err, 'Error')
                    }
                    else {
                        console.log("Company fetched successfully using company name");
                        console.log(result);
                        callback(null, result)
                    }
                })
                break;
            }
        case "GET_COMPANY_REVIEWS_ADMIN":
            {
                let data = msg.body;
                let reviews = Review.find({ companyId: data.companyId, approvalstatus: data.approvalstatus }).exec((err, result) => {

                    if (err) {
                        callback(err, 'Error')
                    }
                    else {
                        console.log("Company reviews fetched successfully");
                        console.log(result);
                        callback(null, result)
                    }
                })
                break;
            }
    }
}

exports.handle_request = handle_request;