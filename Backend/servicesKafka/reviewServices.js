const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR,
    REVIEW_ROUTE,
    POST_STUDENT_REVIEW,
    GET_STUDENT_REVIEWS,
    GET_ALL_REVIEWS,
    GET_COMPANY_REVIEWS,
    PUT_COMPANY_REPLY,

  } = require("../config/routeConstants");
  

  var kafka = require('../kafka/client');
  
  module.exports.postStudentReview=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.body))
    data={
      api:"POST_STUDENT_REVIEW",
      body: req.body
    }
    kafka.make_request('reviews', data, function(err,results){
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

  module.exports.getCompanyReviews=(req,res)=>{
    // console.log("req.body"+JSON.stringify(req.query))
    data={
      api:"GET_COMPANY_REVIEWS",
      body: req.query
    }
    kafka.make_request('reviews', data, function(err,results){
      // console.log('in result');
      // console.log(results);
      if (err) {
        // console.log("In error");
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    } else {
        // console.log("In else");
        res.status(RES_SUCCESS).send(JSON.stringify(results));
    }
      
  });
  }

  module.exports.getStudentReviews=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.query))
    data={
      api:"GET_STUDENT_REVIEWS",
      body: req.query
    }
    kafka.make_request('reviews', data, function(err,results){
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
  

  module.exports.updateReviewHelpfulCount=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.body))
    data={
      api:"PUT_COMPANY_REVIEW_HELPFUL",
      body: req.body
    }
    kafka.make_request('reviews', data, function(err,results){
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
  
  module.exports.getMostPositiveReview=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.query))
    data={
      api:"GET_POSITIVE_REVIEW",
      body: req.query
    }
    kafka.make_request('reviews', data, function(err,results){
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

  module.exports.getMostNegativeReview=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.query))
    data={
      api:"GET_NEGATIVE_REVIEW",
      body: req.query
    }
    kafka.make_request('reviews', data, function(err,results){
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

  module.exports.getReviewAverage=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.query))
    data={
      api:"GET_REVIEW_AVERAGE",
      body: req.query
    }
    kafka.make_request('reviews', data, function(err,results){
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

  module.exports.putReviewApprove=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.body))
    data={
      api:"PUT_REVIEW_APPROVE",
      body: req.body
    }
    kafka.make_request('reviews', data, function(err,results){
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

  module.exports.putReviewReject=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.body))
    data={
      api:"PUT_REVIEW_REJECT",
      body: req.body
    }
    kafka.make_request('reviews', data, function(err,results){
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

  module.exports.getReviewDetails=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.query))
    data={
      api:"GET_REVIEW_DETAILS",
      body: req.query
    }
    kafka.make_request('reviews', data, function(err,results){
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

  module.exports.getAllReviews=(req,res)=>{
    console.log("req.body"+JSON.stringify(req.query))
    data={
      api:"GET_ALL_REVIEWS",
      body: req.query
    }
    kafka.make_request('reviews', data, function(err,results){
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

  module.exports.getApprovedCompanyReviews=(req,res)=>{
    // console.log("req.body"+JSON.stringify(req.query))
    data={
      api:"GET_APPROVED_COMPANY_REVIEWS",
      body: req.query
    }
    kafka.make_request('reviews', data, function(err,results){
      // console.log('in result');
      // console.log(results);
      if (err) {
        // console.log("In error");
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    } else {
        // console.log("In else");
        res.status(RES_SUCCESS).send(JSON.stringify(results));
    }
      
  });
  }