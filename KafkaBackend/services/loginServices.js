const { response } = require('express');
var bcrypt = require('bcryptjs');
const saltRounds = 10;
var mysqlConnection = require('../config/mysqlConnection');
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");
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



async function handle_request(msg, callback) {
    let returnObject = {};
    email = msg.email
    password = msg.password
    var sql2 = "select * from  users where email = '" + email + "'";
    new Promise((resolve, reject) => {
        mysqlConnection.query(sql2, function (error, result) {
            console.log(result[0])
            if (!result[0]) {
                returnObject.message = "nouser";
                console.log('Invalid user');
                callback(null,returnObject)
                //res.json(returnObject);
            }
            resolve(result[0])
        });
    })
        .then((value) => {
            new Promise((resolve, reject) => {
                bcrypt.compare(password, value.password, (err, result) => {
                    console.log("Result", result)
                    if (err) throw err;
                    resolve([result, value]);
                })
            })
                .then((value) => {
                    console.log("Val", value)
                    console.log("val[0]", value[0])
                    if (value[0]) {
                        if(value[1].role === "student" || value[1].role === "employer"){
                        var payload = { id: value[1].id,name:value[1].name, email: value[1].email, role: value[1].role, user_id: value[1].user_id };
                        }
                        else{
                        var payload = { id: value[1].id,name:value[1].name, email: value[1].email, role: value[1].role};   
                        }
                        console.log(payload)
                        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                            expiresIn: 1008000
                        });
                        // res.status(RES_SUCCESS).send({token: "JWT " + token });
                        callback(null,{token: "JWT " + token })
                    }
                    else {
                        console.log("Inside err");
                        // res.json({
                        //     status: "error",
                        //     msg: "System Error, Try Again."
                        // })
                        callback(err,'Error')
                    }
                })
        })


}

exports.handle_request = handle_request;
