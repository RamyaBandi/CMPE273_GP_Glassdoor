const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR,
    POST_STUDENT_SIGNUP,
    GET_STUDENT_SIGNUP,
    PUT_STUDENT_SIGNUP,
    PUT_STUDENT_DEMOGRAPHICS,
    PUT_STUDENT_JOBPREFERENCE,
    POST_RESUME_UPLOAD,
    GET_STUDENT_RESUMES,
    PUT_PRIMARY_RESUME,
    DELETE_STUDENT_RESUME,
    GET_COUNT_RATINGS,
    GET_PHOTOS_UPLOADED
  } = require("../config/routeConstants");
  const multer = require('multer');
//const kafka = require('../kafka/client')
const uploadToS3 = require('./uploadToS3');
const { json } = require('body-parser');
const S3 = require('./S3Operations')
const fs = require('fs')
const path = require('path');
const { stringify } = require('querystring');

  var kafka = require('../kafka/client');
  
  module.exports.createStudentProfile=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.body))
    data={
      api:"POST_STUDENT_SIGNUP",
      body: req.body
    }
    kafka.make_request('student', data, function(err,results){
      console.log('in result');
      console.log(results);
      if (err) {
        console.log("In error");
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    } else {
        console.log("In else");
        res.status(RES_SUCCESS).send(JSON.stringify(results));
    }
      
  });
  }

  module.exports.getSudentDetails=(req,res)=>{
    console.log("req.query"+JSON.stringify(req.query))
    data={
      api:"GET_STUDENT_SIGNUP",
      body: req.query
    }
    kafka.make_request('student', data, function(err,results){
      console.log('in result');
      console.log(results);
      if (err) {
        console.log("In error");
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    } else {
        console.log("In else");
        res.status(RES_SUCCESS).send(JSON.stringify(results));
    }
      
  });
  }

  module.exports.updateStudentDetails=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.body))
    data={
      api:"PUT_STUDENT_SIGNUP",
      body: req.body
    }
    kafka.make_request('student', data, function(err,results){
      console.log('in result');
      console.log(results);
      if (err) {
        console.log("In error");
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    } else {
        console.log("In else");
        res.status(RES_SUCCESS).send(JSON.stringify(results));
    }
      
  });
  }

  module.exports.updateStudentDemographics=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.body))
    data={
      api:"PUT_STUDENT_DEMOGRAPHICS",
      body: req.body
    }
    kafka.make_request('student', data, function(err,results){
      console.log('in result');
      console.log(results);
      if (err) {
        console.log("In error");
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    } else {
        console.log("In else");
        res.status(RES_SUCCESS).send(JSON.stringify(results));
    }
      
  });
  }

  module.exports.updateStudentJobPreferences=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.body))
    data={
      api:"PUT_STUDENT_JOBPREFERENCE",
      body: req.body
    }
    kafka.make_request('student', data, function(err,results){
      console.log('in result');
      console.log(results);
      if (err) {
        console.log("In error");
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    } else {
        console.log("In else");
        res.status(RES_SUCCESS).send(JSON.stringify(results));
    }
      
  });
  }

  module.exports.updateStudentResume=async (req,res)=>{
    console.log("req.body"+JSON.stringify(req.body))
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
                data={
                    api:"POST_RESUME_UPLOAD",
                    body: {...req.body, resumeUrl: url}
                  }
                  kafka.make_request('student', data, function(err,results){
                    console.log('in result');
                    console.log(results);
                    if (err) {
                      console.log("In error");
                      res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
                  } else {
                      console.log("In else");
                      res.status(RES_SUCCESS).send(JSON.stringify(results));
                  }                    
                });
            })
        });

    } catch (error) {
        console.log(error);
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
    }
  }


  module.exports.getStudentResumes=(req,res)=>{
    console.log("req.query"+JSON.stringify(req.query))
    data={
      api:"GET_STUDENT_RESUMES",
      body: req.query
    }
    kafka.make_request('student', data, function(err,results){
      console.log('in result');
      console.log(results);
      if (err) {
        console.log("In error");
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    } else {
        console.log("In else");
        res.status(RES_SUCCESS).send(JSON.stringify(results));
    }
      
  });
  }

  module.exports.updatePrimaryResume=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.body))
    data={
      api:"PUT_PRIMARY_RESUME",
      body: req.body
    }
    kafka.make_request('student', data, function(err,results){
      console.log('in result');
      console.log(results);
      if (err) {
        console.log("In error");
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    } else {
        console.log("In else");
        res.status(RES_SUCCESS).send(JSON.stringify(results));
    }
      
  });
  }


  module.exports.deleteStudentResume=(req,res)=>{
    console.log("req.query"+JSON.stringify(req.query))
    data={
      api:"DELETE_STUDENT_RESUME",
      body: req.query
    }
    kafka.make_request('student', data, function(err,results){
      console.log('in result');
      console.log(results);
      if (err) {
        console.log("In error");
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    } else {
        console.log("In else");
        res.status(RES_SUCCESS).send(JSON.stringify(results));
    }
      
  });
  }

  module.exports.getRatingsCount=(req,res)=>{
    console.log("req.query"+JSON.stringify(req.query))
    data={
      api:"GET_COUNT_RATINGS",
      body: req.query
    }
    kafka.make_request('student', data, function(err,results){
      console.log('in result');
      console.log(results);
      if (err) {
        console.log("In error");
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    } else {
        console.log("In else");
        res.status(RES_SUCCESS).send(JSON.stringify(results));
    }
      
  });
  }

  module.exports.getPhotosUploaded=(req,res)=>{
    console.log("req.query"+JSON.stringify(req.query))
    data={
      api:"GET_PHOTOS_UPLOADED",
      body: req.query
    }
    kafka.make_request('student', data, function(err,results){
      console.log('in result');
      console.log(results);
      if (err) {
        console.log("In error");
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    } else {
        console.log("In else");
        res.status(RES_SUCCESS).send(JSON.stringify(results));
    }
      
  });
  }