const { response } = require('express');
var bcrypt = require('bcryptjs');
const saltRounds = 10;
var mysqlConnection = require('../config/mysqlConnection');
// const {
//     CONTENT_TYPE,
//     APP_JSON,
//     RES_SUCCESS,
//     RES_BAD_REQUEST,
//     RES_NOT_FOUND,
//     RES_DUPLICATE_RESOURCE,
//     TEXT_PLAIN,
//     RES_INTERNAL_SERVER_ERROR
// } = require("../config/routeConstants");



module.exports.register = (req, res) => {
    let returnObject = {}
    console.log("Register data", req.body)
    new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(req.body.password, salt, (err, encrypted) => {
                if (err) throw err;
                resolve(encrypted)
            })
        })
    })
        .then((value) => {
            var sql1 = "insert into users (name, email, password, role) values ('" + req.body.name + "', '" + req.body.email + "', '" + value + "', '" + req.body.role + "')";
            mysqlConnection.query(sql1, function (error, rows) {
                if (error) {
                    returnObject.message = "error";
                    returnObject.data = []
                    res.json(returnObject);
                }
                else {
                    returnObject.message = "Registered Successfully";
                    returnObject.data = rows[0]
                    res.json(returnObject);
                }
            });

        });
}
