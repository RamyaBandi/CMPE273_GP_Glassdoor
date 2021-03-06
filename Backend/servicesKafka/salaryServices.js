const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR,
    SALARY_ROUTE,
    POST_STUDENT_SALARY,
    GET_STUDENT_SALARIES,
    GET_COMPANY_SALARIES,
  } = require("../config/routeConstants");
  

  var kafka = require('../kafka/client');
  
  module.exports.postStudentSalary=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.body))
    data={
      api:"POST_STUDENT_SALARY",
      body: req.body
    }
    kafka.make_request('salaries', data, function(err,results){
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

  module.exports.getCompanySalaries=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.query))
    data={
      api:"GET_COMPANY_SALARIES",
      body: req.query
    }
    kafka.make_request('salaries', data, function(err,results){
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

  module.exports.getStudentSalaries=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.query))
    data={
      api:"GET_STUDENT_SALARIES",
      body: req.query
    }
    kafka.make_request('salaries', data, function(err,results){
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

  module.exports.getSalaryAverages=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.query))
    data={
      api:"GET_SALARY_AVERAGES",
      body: req.query
    }
    kafka.make_request('salaries', data, function(err,results){
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