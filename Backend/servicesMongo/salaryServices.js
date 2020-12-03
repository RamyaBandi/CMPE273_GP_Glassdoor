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

const Company = require('../models/Company');
const Student = require('../models/Student')
const Salaries = require('../models/Salaries')

module.exports.postStudentSalary = (req, res) => {
    console.log("Inside Salaries POST service");
    console.log(req.body)
    let data = req.body
    let salaries = Salaries({
        companyId: data.companyId,
        studentId: data.studentId,
        jobTitle: data.jobTitle,
        baseSalary: data.baseSalary,
        bonuses: data.bonuses,
        yearsOfExperience: data.yearsOfExperience,
        location: data.location,
        employerName: data.employerName,
    })
    salaries.save((err, result) => {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {

            // console.log("Salary Doc created : " + JSON.stringify(result));
            Company.findOneAndUpdate({ _id: data.companyId }, { $push: { "salaries": result._id } }, (error, results) => {
                if (error) {
                    console.log("Error adding salary to company" + error)
                    res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                }
                else {
                    Student.findOneAndUpdate({ _id: data.studentId }, { $push: { "salaries": result._id } }, (error2, results2) => {
                        if (error2) {
                            console.log("Error adding salary to Student" + error2)
                            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error2));
                        }
                        else {
                            console.log("Salary inserted Successfully")
                            res.status(RES_SUCCESS).end(JSON.stringify(results2));
                        }
                    })

                }
            })
        }
    })
}


module.exports.getCompanySalaries = async (req, res) => {

    console.log("Inside Company Salaries GET service");
    let data = req.query
    console.log(data)
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
            console.log("Salaries fetched Successfully from DB - page not 1 or redis off")
            res.status(RES_SUCCESS).send(result);
        }
        catch {
            if (err) {
                console.log(err);
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
            }
        }            
}


module.exports.getStudentSalaries = (req, res) => {

    console.log("Inside Student Salaries GET service");
    console.log(req.query)
    let data = req.query
    let salaries = Student.find({ _id: data.studentId }).select('salaries').populate('salaries').limit(data.limit * 1).skip((data.page - 1) * data.limit).exec((err, result) => {

        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else {
            // console.log(JSON.stringify(result));
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            console.log("Salaries fetched Successfully")
            res.status(RES_SUCCESS).send(result);
        }
    })
}