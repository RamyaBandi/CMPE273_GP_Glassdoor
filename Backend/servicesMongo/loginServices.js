const { response } = require('express');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const login_credentials = require('../models/LoginCredentials');

const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR,
    POST_LOGIN
} = require("../config/routeConstants");

const kafka = require('../kafka/client')
const { auth } = require('../config/passport')
auth();
module.exports.login = (req, res) => {
    console.log("Inside Login POST service");
    console.log("req body" + JSON.stringify(req.body));
    kafka.make_request('login', {
        api: "POST_LOGIN",
        body: req.body
    }, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            const token = jwt.sign({ username: req.body.username }, process.env.JWT_SECRET_KEY, {
                expiresIn: process.env.JWT_TOKEN_EXPIRATION
            });

            res.status(RES_SUCCESS).send({ data: results, token: process.env.JWT_TOKEN_PREFIX + " " + token });
        }

    });



}
