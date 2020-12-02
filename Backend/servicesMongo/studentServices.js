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


module.exports.getSudentDetails = (req, res) => {

    console.log("Inside Student Updated Profile GET service");
    console.log(req.query)
    let data = req.query
    let studentDetails = Student.find({ _id: data.studentId }).exec((err, result) => {

        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else {
            // console.log(JSON.stringify(result));
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            console.log("Student Details fetched Successfully");
            console.log(result);
            res.status(RES_SUCCESS).send(result);
        }
    })
}

module.exports.updateStudentDetails = (req, res) => {
    console.log("Inside Student Profile PUT service");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body
    let student_update = {
        studentName: data.studentName,
        interestedJobtitle: data.interestedJobtitle,
        phoneNumber: data.phoneNumber,
        website: data.website,
        education: data.education,
        experience: data.experience,
        location: data.location,
        degree: data.degree,
        yearsOfExperience: data.yearsOfExperience,
        aboutMe: data.aboutMe,
    }
    Student.findByIdAndUpdate(data.studentId, student_update, (err, result) => {
        if (err) {
            console.log("Error updating student profile" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Update student Profile : " + JSON.stringify(result))
            res.status(200).end(JSON.stringify(result))
        }
    })
}

module.exports.updateStudentDemographics = (req, res) => {
    console.log("Inside Student demographics PUT service");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body
    let demographics_update = {
        race:data.race,
        gender:data.gender,
        disability:data.disability,
        veteranStatus:data.veteranStatus,
    }
    Student.findByIdAndUpdate(data.studentId, demographics_update, (err, result) => {
        if (err) {
            console.log("Error updating student profile" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Update student demographics : " + JSON.stringify(result))
            res.status(200).end(JSON.stringify(result))
        }
    })
}

module.exports.updateStudentJobPreferences = (req, res) => {
    console.log("Inside Student Job Preferences PUT service");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body
    let jobPreference_update = {
        jobSearchStatus: data.jobSearchStatus,
        jobTitle: data.jobTitle,
        targetedSalary: data.targetedSalary,
        relocationPreference: data.relocationPreference,
        industryPreference: data.industryPreference,
    }
    Student.findByIdAndUpdate(data.studentId, jobPreference_update, (err, result) => {
        if (err) {
            console.log("Error updating student profile" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Update student jobPreference : " + JSON.stringify(result))
            res.status(200).end(JSON.stringify(result))
        }
    })
}