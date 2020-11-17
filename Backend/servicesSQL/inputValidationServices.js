const { response } = require('express');
var mysqlConnection = require('../config/mysqlConnection');
// const con = require('../config/dbConnection');
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



module.exports.validate = (req, res) => {
    let returnObject = {};

    var sql1 = "select name, email, role from  users";
        mysqlConnection.query(sql1, function (error, result) {
            console.log(result)
            if (!result) {
                returnObject.data = '';

            }
            else{
                returnObject.data = result
            }
            res.json(returnObject);
        });
}
