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
const Resumes = require('../models/Resumes')
const Reviews=require('../models/Reviews')
const multer = require('multer');
//const kafka = require('../kafka/client')
const uploadToS3 = require('./uploadToS3');
const { json } = require('body-parser');
const S3 = require('./S3Operations')
const fs = require('fs')
const path = require('path');
const { stringify } = require('querystring');

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

module.exports.updateStudentResume = async (req, res) => {
    console.log("Inside POST student resume service");
    console.log("req body" + JSON.stringify(req.body));
    let filename = `studentresume_${Date.now()}.pdf`;
    let pathname = '/cmpe273images/'
    let userRequestObject = req.body;



    try {

        const storage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, './assets');
            },
            filename(req, file, cb) {
                console.log(JSON.stringify(req.body))
                cb(null, `${filename}`);
            },
        });

        const upload = multer({
            storage
        }).single('file');

        await upload(req, res, (err) => {
            console.log("In upload" + JSON.stringify(req.body))
            if (err instanceof multer.MulterError) {
                return res.status(500);
            }
            if (err) {
                return res.status(500);
            }
            console.log("S3 upload")
            S3.fileupload(process.env.AWS_S3_BUCKET_NAME,"cmpe273images/studentresume", req.file).then((url) => {
                console.log(url)
                console.log(req.body)
                let resume_details = Resumes({
                    studentId: req.body.studentId,
                    uploadDate: Date.now(),
                    uploadLink: url,
                    uploadFileName: req.body.fileName
                })
                resume_details.save((err, result) => {
                    if (err) {
                        console.log("Error creating Student profile" + err)
                        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
                    }
                    else {
                        console.log("Created Student Resumes : " + JSON.stringify(result))
                        Student.findByIdAndUpdate(req.body.studentId, { $push: { "resumes": result._id, "resumeNames": req.body.fileName } }, (err, result) => {
                            if (err) {
                                console.log('Error occured while updating Profile image link' + err)
                                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                            }
                            else {
                                console.log('Image link set' + result)
                                res.status(RES_SUCCESS).send(result);
                            }
                        })

                    }
                })
               
                    

                

               
            })


        });

    } catch (error) {
        console.log(error);
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
    }

}

module.exports.getStudentResumes =async (req, res) => {

    console.log("Inside Student Resumes GET service");
    console.log(req.query)
    try {
    let data = req.query
    let studentDetails = await Resumes.find({studentId: data.studentId}).exec();
    //let studentde=await Resumes.find({studentId: data.studentId}).exec();
    const count = await Resumes.countDocuments({studentId: data.studentId });
    //console.log("count" + count);
    console.log(studentDetails)
    //console.log(studentde)
    res.status(RES_SUCCESS).send(studentDetails);
    }
    catch {
        // if (err) {
        //     console.log(err);
        //     //res.setHeader(CONTENT_TYPE, APP_JSON);
        //     res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        // }
    }   
    
}

module.exports.updatePrimaryResume =async (req, res) => {

    console.log("Inside Student Primary Resume UPDATE service");
    console.log(req.body)
    let data = req.body
    let primaryresume = {
        primaryResume: data.resumeId,
    }
    Student.findByIdAndUpdate(data.studentId, primaryresume, (err, result) => {
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

module.exports.deleteStudentResume =async (req, res) => {

    console.log("Inside Student Resume DELETE service");
    console.log(req.query)
    let data = req.query
    // let resume_id = {
    //     resumeId: data.resumeId,
    // }
    Resumes.findByIdAndDelete(data.resumeId, (err, result) => {
        if (err) {
            console.log("Error updating student profile" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Update student jobPreference : " + JSON.stringify(result))
            Student.updateOne( {_id: data.studentId}, { $pullAll: {resumes: [data.resumeId] } },(error,result)=>{
                if(error){
                    res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                }
                else{
                    res.status(200).end(JSON.stringify(result))
                }
            } )
            
            
        }
    })
    
}

module.exports.getRatingsCount =async (req, res) => {

    console.log("Inside Student Ratings and Reviews Count GET service");
    console.log(req.query)
    try {
    let data = req.query
    

    const studentreviews = await Reviews.find({studentId: data.studentId }).exec();
    const count = await Reviews.countDocuments({studentId: data.studentId });
    console.log("count" + count);
    console.log(studentreviews)
    //let value= toString(count)

    res.status(RES_SUCCESS).send(studentreviews);
    }
    catch {
        // if (err) {
        //     console.log(err);
        //     //res.setHeader(CONTENT_TYPE, APP_JSON);
        //     res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        // }
    }   
    
}


