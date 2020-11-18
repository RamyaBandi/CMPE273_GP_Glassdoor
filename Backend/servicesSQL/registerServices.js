const { response } = require('express');
var bcrypt = require('bcryptjs');
const saltRounds = 10;
const mysqlConnection = require('../config/mysqlConnection');
const student = require('../models/Student')
const company = require('../models/Company')

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



module.exports.register = (req, res) => {
    var user_id = '';
    let returnObject = {};
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
            if (req.body.role === "student") {
                let studentObj = { studentName: req.body.name, email: req.body.email }
                const newStudent = new student(studentObj)
                newStudent.save((err, result) => {
                    if (err) {
                        // callback(err,'Error')
                        console.log("Error1", err)
                    }
                    else {
                        student.find({ email: req.body.email }, { _id: 1 }, (err, docs) => {
                            if (err) {
                                // callback(err,'Error')
                                console.log("Error2", err)
                            }
                            else {
                                console.log("docs", docs)
                                user_id = docs[0]._id
                                console.log("User ID", user_id)
                                registerUser(value, user_id)
                            }
                        })
                    }
                })
            }
            if(req.body.role === "employer"){
                let companyObj = { companyName: req.body.name, email: req.body.email }
                const newCompany = new company(companyObj)
                newCompany.save((err, result)=>{
                    if(err){
                        // callback(err,'Error')
                        console.log("Error", err)
                    }
                    else{
                        company.find({email: req.body.email},{_id: 1}, (err,docs)=>{
                            if(err){
                                // callback(err,'Error')
                                console.log("Error")
                            }
                            else{
                                user_id =  docs[0]._id
                                console.log("User ID", user_id)
                                registerUser(value, user_id)

                            }
                        })
                    }
                })
            }

        });
        registerUser = (value, user_id)=>{
            var sql1 = "insert into users (name, email, password, role, user_id) values ('" + req.body.name + "', '" + req.body.email + "', '" + value + "', '" + req.body.role + "', '" + user_id + "')";
            console.log("Query", sql1)
            mysqlConnection.query(sql1, function (error, rows) {
                if (error) {
                    console.log("Inside err");
                    res.json({
                        status: "error",
                        msg: "System Error, Try Again."
                    })
                }
                else {
                    res.status(RES_SUCCESS).send({ data: rows});
                }
            });
        }
}
