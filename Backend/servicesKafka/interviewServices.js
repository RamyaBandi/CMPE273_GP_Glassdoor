const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR,
    INTERVIEW_ROUTE,
    POST_STUDENT_INTERVIEW,
    GET_STUDENT_INTERVIEWS,
    GET_COMPANY_INTERVIEWS,
  } = require("../config/routeConstants");
  

  var kafka = require('../kafka/client');
  
  module.exports.postStudentInterview=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.body))
    data={
      api:"POST_STUDENT_INTERVIEW",
      body: req.body
    }
    kafka.make_request('interviews', data, function(err,results){
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

  module.exports.getCompanyInterviews=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.query))
    data={
      api:"GET_COMPANY_INTERVIEWS",
      body: req.query
    }
    kafka.make_request('interviews', data, function(err,results){
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

  module.exports.getStudentInterviews=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.query))
    data={
      api:"GET_STUDENT_INTERVIEWS",
      body: req.query
    }
    kafka.make_request('interviews', data, function(err,results){
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
  
  