const { response } = require('express');
const con = require('../config/mongoConnection');
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
const Student = require('../models/Student');

module.exports.createStudentProfile = (req, res) => {
    console.log("Inside Student Profile POST service");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body
    let student = Student({
        studentName: data.studentName,
        email: data.email
    })
    student.save((err, result) => {
        if (err) {
            console.log("Error creating Student profile" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Created Student Profile : " + JSON.stringify(result))
            res.status(200).end(JSON.stringify(result))
        }
    })
}
