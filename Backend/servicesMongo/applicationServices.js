
const { response, application } = require('express');
const mongoose = require('mongoose');
const con = require('../config/mongoConnection');

const AWS = require('aws-sdk');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');

const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR,
    POST_LOGIN
} = require("../config/routeConstants");
const { populate } = require('../models/Applications');

AWS.config.update({
    secretAccessKey: process.env.AWS_S3_SECRETACCESSKEY,
    accessKeyId: process.env.AWS_S3_ACCESSKEYID,
    region: process.env.AWS_S3_REGION
});

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
    const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
}

AWS.config.setPromisesDependency(bluebird);

const Applications = require('../models/Applications');
const Resume = require('../models/Resumes');


// const redisClient = require('../config/redisConnection');
const Jobs = require('../models/Jobs');


module.exports.postApplication = async (req, res) => {
   
    const studentId=req.query.studentId
    const jobId=req.query.jobId
    const resumeUploaded=req.query.resumeUploaded
    const coverLetterUploaded=req.query.coverLetterUploaded
    console.log(coverLetterUploaded)
    console.log(req.query)

    let count = null
    Applications.countDocuments({ studentId: studentId }, (err, res) => {
        if (res) {
            count = res
            

        }
    }).then(async () => {
       
        if (count < 0) {
            console.log("Application exists already")
            res.status(RES_INTERNAL_SERVER_ERROR).end("Already Applied!");

        }
        else {

        const form = new multiparty.Form();

    form.parse(req, async function(err, fields, files) {
        let resumeUrl;

        //upload resume

        if(resumeUploaded==='true'){
            const { path,fieldName,originalFilename } = files["resume"][0];
            const buffer = fs.readFileSync(path);
            const type = await fileType.fromBuffer(buffer)
            //const timestamp = Date.now().toString();
            const fileName = `${fieldName}/${studentId}/${jobId}`;
            console.log(fileName)
            const data = await uploadFile(buffer, fileName, type);
         resumeUrl=data.Location;
        }else{
            const resume=await Resume.findOne({studentId: studentId})
            console.log(resume);
            if(resume===null){
            return res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify("You did not upload resume and there is no primary resume!"));
            }
            let temp="";
            console.log(resume)
            
            for(let i=0;i<resume.uploadLink.length;i++){
                if(resume.uploadLink[i]!='?'){
                    temp+=resume.uploadLink[i];
                }else{
                    break;
                }
            }
            resumeUrl=temp;
        }

        //upload cover letter
        let coverLetterUrl;
        if(coverLetterUploaded==='true'){
            const { path,fieldName,originalFilename } = files["Cover Letter"][0];
            const buffer = fs.readFileSync(path);
            const type = await fileType.fromBuffer(buffer)
            //const timestamp = Date.now().toString();
            const fileName = `${fieldName}/${studentId}/${jobId}`;
            console.log(fileName)
            const data = await uploadFile(buffer, fileName, type);
         coverLetterUrl=data.Location;
            }

            let application = Applications({
                studentId: studentId,
                jobId: jobId,
                appliedDate: Date.now(),
                applicationstatus: "Applied",
                status: "Submitted",
                resumeUrl: resumeUrl,
                coverLetterUrl:coverLetterUrl
            })

            application.save((err, result) => {

                if (err) {
                    console.log("Error creating application")
                    console.log(err);
                    //res.setHeader(CONTENT_TYPE, APP_JSON);
                    res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
                }
                else {
                    // console.log(JSON.stringify(result));
                    //res.setHeader(CONTENT_TYPE, APP_JSON);
                    Jobs.findOneAndUpdate({ _id: jobId }, { $push: { 'applications': result._id } }, (error, results) => {
                        if (error) {
                            console.log("Error Updating Jobs with application id")
                            console.log(error);
                            //res.setHeader(CONTENT_TYPE, APP_JSON);
                            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                        }
                        else {
                            // console.log(JSON.stringify(result));
                            //res.setHeader(CONTENT_TYPE, APP_JSON);
                            console.log("Application created Successfully");
                            //console.log(result);
                            res.status(RES_SUCCESS).send(result);
                        }
                    })
                }
            })

    });

            //create application
            
        }
    })
}

module.exports.getApplicationsByJobId = async (req, res) => {

    console.log("Inside Applications Jobs GET service");
    let data = req.query
    console.log(data)
    try {

        let applications
        await Applications.find({ jobId: data.jobId })
            .limit(data.limit * 1).skip((data.page - 1) * data.limit)
            // .populate({ path: 'jobId', model: 'Jobs' })
            .populate({ path: 'studentId', model: 'Student' })
            // .populate({ path: 'resume', model: 'Resume' })
            .exec((err, results) => {
                if (err) {
                    console.log("Error Fetching Applications with job id")
                    console.log(err);
                    //res.setHeader(CONTENT_TYPE, APP_JSON);
                    res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
                }
                else {
                    console.log(results)

                    Applications.countDocuments({ jobId: data.jobId }, (err, count) => {
                        const result = ({
                            results,
                            totalPages: Math.ceil(count / data.limit),
                            currentPage: data.page
                        });
                        console.log("Applications fetched successfully from DB")
                        res.status(RES_SUCCESS).send(result);
                    })
                }
            });

    }
    catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
}


module.exports.putApplications = async (req, res) => {

    console.log("Inside Applications PUT service");
    let data = req.body
    console.log(data)
    let applicationstatus
    if (data.status === "Submitted" || data.status === "Reviewed" || data.status === "Initial Screening" || data.status === "Interviewing") {
        applicationstatus = "Applied"

    }
    else if (data.status === "Hired") {
        applicationstatus = "Selected"

    }
    else if (data.status === "Rejected") {
        applicationstatus = "Rejected"
    }
    try {
        Applications.findOneAndUpdate({ _id: data.applicationId }, { status: data.status, applicationstatus: applicationstatus }, (err, result) => {
            if (err) {
                console.log("Error Updating application status")
                console.log(err);
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
            }
            else {
                // console.log(JSON.stringify(result));
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                console.log("Application updated Successfully");
                console.log(result);
                res.status(RES_SUCCESS).send(result);
            }
        })

    }
    catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
}