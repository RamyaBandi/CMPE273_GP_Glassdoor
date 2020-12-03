const { response } = require('express');
var bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const { auth } = require('../config/passport')
auth();
var kafka = require('../kafka/client');
// const { jwtsecret } = require('../config/mysqlinit')

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



module.exports.login = (req, res) => {
    console.log("req.body" + JSON.stringify(req.body))
    kafka.make_request('login', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("In error");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        } else {
            console.log("In else");
            res.status(RES_SUCCESS).send(JSON.stringify(results));
        }
    });
}
