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
const mongoose = require("mongoose");
const routes = require("../config/routeConstants");

const LoginCredentials = require('../models/LoginCredentials');
const Customers = require("../models/Customers");
const Restaurants = require("../models/Restaurants");

function handle_request(msg, callback) {

    console.log("Inside Login Services ->kafka backend");
    console.log(msg);
    switch (msg.api) {
        case "POST_LOGIN":
            LoginCredentials.findOne({ email_id: msg.body.username }, (err, response) => {
                if (err) {
                    console.log('User Not found' + err)
                    callback(err, 'Error')
                }
                else if (response) {
                    console.log(response)
                    if (response.user_password === msg.body.password) {
                        // console.log("Inside first if")
                        if (response.user_type == 1) {
                            Customers.findOne({ email_id: msg.body.username }, (err, res) => {

                                if (err) {
                                    console.log('Error occured while fetching login details' + err)
                                    callback(err, 'Error')
                                }
                                else {
                                    console.log('Customer data' + res)
                                    let out = {
                                        customer_id: res._id,
                                        user_type: response.user_type
                                    }
                                    callback(null, out)
                                }


                            })
                        }
                        else {
                            Restaurants.findOne({ email: msg.body.username }, (err, res) => {
                                if (err) {
                                    console.log('Error occured while fetching login details' + err)
                                    callback(err, 'Error')
                                }
                                else {
                                    console.log('' + res)
                                    let out = {
                                        restaurant_id: res._id,
                                        user_type: response.user_type
                                    }
                                    callback(null, out)
                                }


                            })
                        }
                    }

                }
                else {
                    console.log('User Not found' + err)
                    callback(err, 'Error')
                }
            })



    }
    // callback(null, response);
    // console.log("after callback");
};

exports.handle_request = handle_request;


