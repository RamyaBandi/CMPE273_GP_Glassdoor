const mongoose = require("mongoose");
const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR,
  } = require("../config/routeConstants");
const Company = require('../models/Company');
const Student = require('../models/Student');
const Photos = require('../models/Photos');

async function handle_request(msg, callback) {
    console.log("Inside Photo Services -> kafka backend");
    console.log(msg);
    switch (msg.api) {
        

            case "GET_ALL_PHOTOS": {
                console.log("inside get all photos");
                let data = msg.body;
                console.log(data);
                try {
                    // data.page = 1;
                    // data.limit = 10;
                    const photos = await Photos.find().limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
                    const count = await Photos.countDocuments();
                    const result = ({
                        photos,
                        totalPages: Math.ceil(count / data.limit),
                        currentPage: data.page
                    });
                    console.log("All photos fetched successfully from DB");
                    callback(null, result);
                }
                catch {
                    if (err) {
                        console.log(err);
                        //res.setHeader(CONTENT_TYPE, APP_JSON);
                        callback(err, 'Error');
                    }
                }
                break;
              }

              case "PUT_PHOTO_APPROVE": {
                console.log("inside approve photo");
                let data = msg.body;
                console.log(data);
                Photos.findByIdAndUpdate(data.photoId, { approvalstatus: "Approved" }, (err, result) => {
                    if (err) {
                        console.log("Error updating photo" + err)
                        callback(err, 'Error');
                    }
                    else {
                        console.log("Update Approval status for a Photo to Approved: " + JSON.stringify(result))
                        callback(null, result);
                    }
                })
                break;
              }

              case "PUT_PHOTO_REJECT": {
                console.log("inside reject photo");
                let data = msg.body;
                console.log(data);
                Photos.findByIdAndUpdate(data.photoId, { approvalstatus: "Rejected" }, (err, result) => {
                    if (err) {
                        console.log("Error updating photo" + err)
                        callback(err, 'Error');
                    }
                    else {
                        console.log("Update Approval status for a Photo to Rejected : " + JSON.stringify(result))
                        callback(null, result);
                    }
                })
                break;
              }
    }
}

exports.handle_request = handle_request;