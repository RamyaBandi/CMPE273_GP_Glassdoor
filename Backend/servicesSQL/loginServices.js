const { response } = require('express');
var bcrypt = require('bcryptjs');
const saltRounds = 10;
var mysqlConnection = require('../config/mysqlConnection');
const jwt = require('jsonwebtoken')
const { jwtsecret } = require('../config/mysqlinit')

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
    let returnObject = {};
    email = req.body.email
    password = req.body.password
    var sql2 = "select * from  users where email = '" + email + "'";
    new Promise((resolve, reject) => {
        mysqlConnection.query(sql2, function (error, result) {
            console.log(result[0])
            if (!result[0]) {
                returnObject.message = "nouser";
                console.log('Invalid user');
                res.json(returnObject);
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
                    if (value[0]) {
                        const payload = { id: value[1].id,name:value[1].name, email: value[1].email, role: value[1].role };
                        console.log(payload)
                        const token = jwt.sign(payload, jwtsecret, {
                            expiresIn: 1008000
                        });
                        res.status(RES_SUCCESS).send({token: "JWT " + token });
                    }
                    else {
                        console.log("Inside err");
                        res.json({
                            status: "error",
                            msg: "System Error, Try Again."
                        })
                    }
                })
        })


}
