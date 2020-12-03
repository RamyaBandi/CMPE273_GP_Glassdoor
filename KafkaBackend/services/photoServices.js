const mongoose = require("mongoose");
const Company = require('../models/Company');
const Student = require('../models/Student');
const Photos = require('../models/Photos');

function handle_request(msg, callback) {
    console.log("Inside Photo Services -> kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "POST_COMPANY_PHOTOS":
            {

            }
        case "GET_COMPANY_PHOTOS":
            {
                let data = msg.body;
                let photos = Photos.find().exec((err, result) => {

                    if (err) {
                        callback(err, 'Error')
                    }
                    else {
                        console.log("Photos fetched successfully");
                        console.log(result);
                        callback(null, result)
                    }
                })
                break;
            }
    }
}