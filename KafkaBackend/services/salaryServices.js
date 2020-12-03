//const { response } = require('express');
const mongoose = require("mongoose");
//const con = require('../config/mongoConnection');
const {
  CONTENT_TYPE,
  APP_JSON,
  RES_SUCCESS,
  RES_BAD_REQUEST,
  RES_NOT_FOUND,
  RES_DUPLICATE_RESOURCE,
  TEXT_PLAIN,
  RES_INTERNAL_SERVER_ERROR,
} = require("../config/routeConstants");
const Company = require("../models/Company");
const Salaries = require("../models/Salaries");
const Student = require("../models/Student");

async function handle_request(msg, callback) {
  console.log("Inside Salary Services ->kafka backend");
  console.log(msg);
  switch (msg.api) {
    case "POST_STUDENT_SALARY": {
      let data = msg.body;
      let salaries = Salaries({
        companyId: data.companyId,
        studentId: data.studentId,
        jobTitle: data.jobTitle,
        baseSalary: data.baseSalary,
        bonuses: data.bonuses,
        yearsOfExperience: data.yearsOfExperience,
        location: data.location,
        employerName: data.employerName,
      });
      salaries.save((err, result) => {
        if (err) {
          console.log(err);
          //res.setHeader(CONTENT_TYPE, APP_JSON);
          callback(err, 'Error')
        } else {
          // console.log("Salary Doc created : " + JSON.stringify(result));
          Company.findOneAndUpdate(
            { _id: data.companyId },
            { $push: { salaries: result._id } },
            (error, results) => {
              if (error) {
                console.log("Error adding salary to company" + error);
                callback(error, 'Error')
              } else {
                Student.findOneAndUpdate(
                  { _id: data.studentId },
                  { $push: { salaries: result._id } },
                  (error2, results2) => {
                    if (error2) {
                      console.log("Error adding salary to Student" + error2);
                      callback(error2, 'Error')
                    } else {
                      console.log("Salary inserted Successfully");
                      callback(null, results2)
                    }
                  }
                );
              }
            }
          );
        }
      });
      break;
    }
    case "GET_COMPANY_SALARIES": {
      console.log("inside get company salaries -> kafka backend");
      let data = msg.body;
      console.log(data);
      try{
        // data.page = 1;
        // data.limit = 10;
        const salaries = await Salaries.find({ companyId: data.companyId }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
        const count = await Salaries.countDocuments({companyId: data.companyId});    
        const result = ({
            salaries,
            totalPages: Math.ceil(count / data.limit),
            currentPage: data.page
        });  
        console.log("Salaries fetched Successfully")
        callback(null, result)
    }
    catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            callback(err, 'Error')
        }
        } 
    }

    case "GET_STUDENT_SALARIES": {
      console.log("inside get student salaries -> kafka backend");
      let data = msg.body;
      console.log(data);
      let salaries = Student.find({ _id: data.studentId }).select('salaries').populate('salaries').limit(data.limit * 1).skip((data.page - 1) * data.limit).exec((err, result) => {

        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            callback(err, 'Error')
        }
        else {
            // console.log(JSON.stringify(result));
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            console.log("Salaries fetched Successfully")
            callback(null, result)
        }
        })
      break;
    }

    default: {
      console.log("Default switch");
    }
  }
}

exports.handle_request = handle_request;
