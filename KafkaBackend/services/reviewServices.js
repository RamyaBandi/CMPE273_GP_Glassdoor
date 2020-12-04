//const { response } = require('express');
const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;
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
const Reviews = require("../models/Reviews");
const Student = require("../models/Student");
const redisClient = require("../config/redisConnection");

async function handle_request(msg, callback) {
  console.log("Inside Review Services ->kafka backend");
  console.log(msg);
  switch (msg.api) {
    case "POST_STUDENT_REVIEW": {
      let data = msg.body;
      let reviews = Reviews({
        companyId: data.companyId,
        studentId: data.studentId,
        headline: data.headline,
        description: data.description,
        pros: data.pros,
        cons: data.cons,
        approvalstatus: "Under Review",
        helpfulCount: 0,
        overallRating: data.overallRating,
        recommendedRating: data.recommendedRating,
        ceoRating: data.ceoRating,
      });
      reviews.save((err, result) => {
        if (err) {
          console.log(err);
          //res.setHeader(CONTENT_TYPE, APP_JSON);
          callback(err, "Error");
        } else {
          console.log("Review Doc created : " + JSON.stringify(result));
          Company.findOneAndUpdate(
            { _id: data.companyId },
            { $push: { reviews: result._id } },
            (error, results) => {
              if (error) {
                console.log("Error adding review to company" + error);
                callback(error, "Error");
              } else {
                Student.findOneAndUpdate(
                  { _id: data.studentId },
                  { $push: { companyReviews: result._id } },
                  (error2, results2) => {
                    if (error2) {
                      console.log("Error adding review to Student" + error2);
                      callback(error2, "Error");
                    } else {
                      console.log("Kafka - Review inserted Successfully");
                      callback(null, results2);
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
    case "GET_COMPANY_REVIEWS": {
      let data = msg.body;

      if (process.env.REDIS_SWITCH == "true" && data.page == '1' && data.limit == '10') {
        try {
            redisClient.get(`CompanyReviews_${data.companyId}`, async (err, redisout) => {
                // If value for key is available in Redis
                if (redisout !== null) {
                    // send data as output
                    console.log("Data exists in redis")
                    //console.log(redisout.length)
                    Reviews.countDocuments({ companyId: data.companyId, approvalstatus: "Approved" })
                        .exec((err, count) => {
                            if (err) {
                                console.log(err);
                                //res.setHeader(CONTENT_TYPE, APP_JSON);
                               callback(err, "Error");
                            }
                            else {

                                const output = ({
                                    reviews: JSON.parse(redisout),
                                    totalPages: Math.ceil(count / data.limit),
                                    currentPage: data.page
                                });
                                // console.log(output)
                                callback(null, output);
                            }
                        })
                }
                // If value for given key is not available in Redis
                else {
                    console.log("else with redis on")
                    // Fetch data from your database
                    Reviews.find({ companyId: data.companyId, approvalstatus: "Approved" })
                        .limit(data.limit * 1)
                        .skip((data.page - 1) * data.limit)
                        .populate({ path: 'studentId', model: 'Student', select: 'studentName' })
                        .exec(async (error, reviews) => {

                            if (error) {
                                console.log(error);
                                callback(error, "Error");
                            }
                            else {
                                const count = await Reviews.countDocuments({ companyId: data.companyId, approvalstatus: "Approved" });

                                // store that in Redis
                                // params: key, time-to-live, value
                                const result = ({
                                    reviews: reviews,
                                    totalPages: Math.ceil(count / data.limit),
                                    currentPage: data.page
                                });
                                redisClient.setex(`CompanyReviews_${data.companyId}`, 36000, JSON.stringify(reviews));

                                callback(null, result);


                                // send data as output
                                //res.setHeader(CONTENT_TYPE, APP_JSON);
                                //console.log("Reviews fetched Successfully")
                            }
                        })

                }
            })
        } catch (error) {
            // Handle error
            console.log("Error while working with redis")
            console.log(error);


        }

    }
    else {
        console.log("else of redis")
        try {


            //approvalstatus: "Approved"
            const reviews = await Reviews.find({ companyId: data.companyId, approvalstatus: "Approved" }).limit(data.limit * 1).skip((data.page - 1) * data.limit).populate({ path: 'studentId', model: 'Student', select: 'studentName' }).exec();

            const count = await Reviews.countDocuments({ companyId: data.companyId, approvalstatus: "Approved" });

            console.log("count" + count);
            console.log(reviews)
            const result = ({
                reviews,
                totalPages: Math.ceil(count / data.limit),
                currentPage: data.page
            });

            console.log("Reviews fetched Successfully from DB - page not 1 or redis off")
            callback(null, result);
        }
        catch {
            // if (err) {
            //     console.log(err);
            //     //res.setHeader(CONTENT_TYPE, APP_JSON);
            //     res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
           // }
        }
    }




       
      break;
    }

    case "GET_STUDENT_REVIEWS": {
      console.log("inside get student reviews");
      let data = msg.body;
      console.log(data);
      let reviews = Student.find({ _id: data.student_id })
        .select("companyReviews")
        .populate("companyReviews")
        .exec((err, result) => {
          console.log("hitting mongo");

          if (err) {
            console.log(err);
            callback(err, "Error");
          } else {
            console.log("Reviews fetched Successfully");
            callback(null, result);
          }
        });
      break;
    }

    case "PUT_COMPANY_REVIEW_HELPFUL": {
      console.log("inside put revew service");
      let data = msg.body;
      console.log(data);
      Reviews.findByIdAndUpdate(
        data.reviewId,
        { $inc: { helpfulCount: 1 } },
        (err, result) => {
          if (err) {
            console.log("Error updating review" + err);
            callback(err, "Error");
          } else {
            console.log(
              "Update Helpful count for Review : " + JSON.stringify(result)
            );
            callback(null, result);
          }
        }
      );
      break;
    }

    case "GET_POSITIVE_REVIEW": {
      console.log("inside get student reviews");
      let data = msg.body;
      console.log(data);
      try {
        const reviews = await Reviews.find({ companyId: data.companyId })
          .sort("-helpfulCount")
          .exec();
        const result = {
          reviews,
        };
        //res.status(RES_SUCCESS).send(result);
        const maxHelpfulCount = result.reviews[0].helpfulCount;
        console.log(maxHelpfulCount);
        try {
          const positiveReviews = await Reviews.find({
            helpfulCount: maxHelpfulCount,
          })
            .sort("-overallRating")
            .exec();
          const result2 = {
            positiveReviews,
          };
          callback(null, result2);
        } catch {
          if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            callback(err, "Error");
          }
        }
      } catch {
        if (err) {
          console.log(err);
          //res.setHeader(CONTENT_TYPE, APP_JSON);
          callback(err, "Error");
        }
      }
      break;
    }

    case "GET_NEGATIVE_REVIEW": {
      console.log("inside get student reviews");
      let data = msg.body;
      console.log(data);
      try {
        const reviews = await Reviews.find({ companyId: data.companyId })
          .sort("-helpfulCount")
          .exec();
        const result = {
          reviews,
        };
        //res.status(RES_SUCCESS).send(result);
        const maxHelpfulCount = result.reviews[0].helpfulCount;
        console.log(maxHelpfulCount);
        try {
          const negativeReviews = await Reviews.find({
            helpfulCount: maxHelpfulCount,
          })
            .sort("overallRating")
            .exec();
          const result2 = {
            negativeReviews,
          };
          callback(null, result2);
        } catch {
          if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            callback(err, "Error");
          }
        }
      } catch {
        if (err) {
          console.log(err);
          //res.setHeader(CONTENT_TYPE, APP_JSON);
          callback(err, "Error");
        }
      }
      break;
    }

    case "GET_REVIEW_AVERAGE": {
      console.log("inside get  reviews average");
      let data = msg.body;
      console.log(data);
      try {
        const avgReviews = await Reviews.aggregate([
          { $match: { companyId: new ObjectId(data.companyId) } },
          {
            $group: {
              _id: null,
              averageOverallRating: { $avg: "$overallRating" },
              averageRecommendedRating: { $avg: "$recommendedRating" },
              averageCeoRating: { $avg: "$ceoRating" },
            },
          },
        ]).exec();
        const result = {
          averageOverallRating: avgReviews[0].averageOverallRating.toFixed(2),
          averageRecommendedRating: avgReviews[0].averageRecommendedRating.toFixed(
            2
          ),
          averageCeoRating: avgReviews[0].averageCeoRating.toFixed(2),
        };
        callback(null, result);
        console.log(avgReviews[0]);
      } catch {
        if (err) {
          console.log(err);
          //res.setHeader(CONTENT_TYPE, APP_JSON);
          callback(err, "Error");
        }
      }
      break;
    }

    case "PUT_REVIEW_APPROVE": {
      console.log("inside put  reviews approve");
      let data = msg.body;
      console.log(data);
      Reviews.findByIdAndUpdate(
        data.reviewId,
        { approvalstatus: "Approved" },
        (err, result) => {
          if (err) {
            console.log("Error updating review" + err);
            callback(err, "Error");
          } else {
            console.log(
              "Update Approval status for a Review to Approved: " +
                JSON.stringify(result)
            );
            callback(null, result);
          }
        }
      );
      break;
    }

    case "PUT_REVIEW_REJECT": {
      console.log("inside put reviews reject");
      let data = msg.body;
      console.log(data);
      Reviews.findByIdAndUpdate(
        data.reviewId,
        { approvalstatus: "Rejected" },
        (err, result) => {
          if (err) {
            console.log("Error updating review" + err);
            callback(err, "Error");
          } else {
            console.log(
              "Update Approval status for a Review to Rejected : " +
                JSON.stringify(result)
            );
            callback(null, result);
          }
        }
      );
      break;
    }

    case "GET_REVIEW_DETAILS": {
      console.log("inside get review details");
      let data = msg.body;
      console.log(data);
      try {
        let reviews = await Reviews.findById(data.reviewId).exec();
        // console.log(JSON.stringify(result));
        //res.setHeader(CONTENT_TYPE, APP_JSON);
        console.log("Review details fetched Successfully");
        console.log(reviews);
        callback(null, reviews);
      } catch {
        if (err) {
          console.log(err);
          //res.setHeader(CONTENT_TYPE, APP_JSON);
          callback(err, "Error");
        }
      }
      break;
    }

    case "GET_ALL_REVIEWS": {
        console.log("inside get all reviews");
        let data = msg.body;
        console.log(data);
        try {
            // data.page = 1;
            // data.limit = 10;
            const reviews = await Reviews.find()
                .limit(data.limit * 1)
                .skip((data.page - 1) * data.limit)
                .exec();
            const count = await Reviews.countDocuments();
            const result = {
                reviews,
                totalPages: Math.ceil(count / data.limit),
                currentPage: data.page,
            };
            callback(null, result);
        } catch {
            if (err) {
                console.log(err);
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                callback(err, "Error");
            }
        }
        break;
      }

      case "GET_APPROVED_COMPANY_REVIEWS": {
        console.log("inside get all approved reviews");
        let data = msg.body;
        console.log(data);
        try {
          //data.page = 1;
          //data.limit = 10;
          const allreviews = await Reviews.find({ companyId: data.companyId }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();   
        const count = await Reviews.countDocuments({ companyId: data.companyId });
        let reviews=[]
        for(let i of allreviews){
            if(i.approvalStatus==="Rejected"){
                continue;
            }
            else if (i.approvalStatus==="Under Review"){
                
                if (i.studentId.toString()===data.studentId){
                    reviews.push(
                        i
                    )
                    
                }
            }else{
                reviews.push(
                    i
                )
                
            }
        }
          //console.log("count" + count);
          //console.log(reviews)
          const result = ({
              reviews,
              totalPages: Math.ceil(count / data.limit),
              currentPage: data.page
          });
      
          console.log("Reviews fetched Successfully from DB - page not 1 or redis off")
          callback(null, result);
      }
      catch {
          if (err) {
              console.log(err);
              //res.setHeader(CONTENT_TYPE, APP_JSON);
              callback(err, "Error");
          }
      }  
        break;
      }

      case "PUT_COMPANY_REPLY": {
        console.log("inside get put reply to review service");
        let data = msg.body;
        console.log(data);
        let reply = {

          reply: data.reply,
          replyTimeStamp: Date.now()
      }
      Reviews.findByIdAndUpdate(data.reviewId, reply, (err, result) => {
          console.log(result.reply)
          console.log(result)
          if (err) {
              console.log("Error updating company profile" + err)
              callback(err, "Error");
          }
          else {
              console.log("Update Company Featured Reviews : " + JSON.stringify(result))
              callback(null, result);
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
