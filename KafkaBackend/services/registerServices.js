//const con = require('../config/mongoConnection');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const mysqlConnection = require('../config/mysqlConnection')
const saltRounds = 10;

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
const Company = require('../models/Company');
const Reviews = require('../models/Reviews');
const student = require('../models/Student')
const redisClient = require('../config/redisConnection')

function handle_request(msg, callback) {
    var user_id = '';
    console.log("Register data", msg)
    new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(msg.password, salt, (err, encrypted) => {
                if (err) throw err;
                resolve(encrypted)
            })
        })
    })
        .then((value) => {
            if (msg.role === "student") {
                let studentObj = { studentName: msg.name, email: msg.email }
                console.log("Student Obj", studentObj)
                const newStudent = new student(studentObj)
                newStudent.save((err, result) => {
                    if (err) {
                        callback(err, 'Error')
                        // console.log("Error1", err)
                    }
                    else {
                        student.find({ email: msg.email }, { _id: 1 }, (err, docs) => {
                            if (err) {
                                callback(err, 'Error')
                                // console.log("Error2", err)
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
            if (msg.role === "employer") {
                let companyObj = { companyName: msg.name, email: msg.email }
                const newCompany = new company(companyObj)
                newCompany.save((err, result) => {
                    if (err) {
                        callback(err, 'Error')
                        // console.log("Error", err)
                    }
                    else {
                        company.find({ email: msg.email }, { _id: 1 }, (err, docs) => {
                            if (err) {
                                callback(err, 'Error')
                                // console.log("Error")
                            }
                            else {
                                user_id = docs[0]._id
                                console.log("User ID", user_id)
                                registerUser(value, user_id)

                            }
                        })
                    }
                })
            }
            if (msg.role === "admin") {
                registerUser(value, 'None')
            }
        });

    registerUser = (value, user_id) => {
        if (msg.role === "admin") {
            var sql1 = "insert into users (name, email, password, role) values ('" + msg.name + "', '" + msg.email + "', '" + value + "', '" + msg.role + "')";
        }
        else {
            var sql1 = "insert into users (name, email, password, role, user_id) values ('" + msg.name + "', '" + msg.email + "', '" + value + "', '" + msg.role + "', '" + user_id + "')";
        }
        console.log("Query", sql1)
        mysqlConnection.query(sql1, function (error, rows) {
            if (error) {
                callback(err, 'Error')
            }
            else {
                // res.status(RES_SUCCESS).send({ data: rows});
                callback(null, rows)
            }
        });
    }

}
exports.handle_request = handle_request;