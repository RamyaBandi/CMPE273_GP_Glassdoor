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
const Reviews = require("../models/Reviews");
const Student = require("../models/Student");
const redisClient = require("../config/redisConnection");

async function handle_request(msg, callback) {
  //console.log("Inside Review Services ->kafka backend");
  //console.log(msg);
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
      if (process.env.REDIS_SWITCH == "true" && data.page == 1) {
        try {
          redisClient.get("topReviews", async (err, redisout) => {
            // If value for key is available in Redis
            //console.log("in redis get")
            //console.log(err)

            if (redisout !== null) {
              // send data as output
              console.log("Data exists in redis");
              // console.log(redisout.length)
              Company.countDocuments({ type: "reviews" }, (err, count) => {
                if (err) {
                  console.log(err);

                  callback(err, "Error");
                } else {
                  // console.log("in company countdocuments")
                  let output = {
                    reviews: JSON.parse(redisout),
                    totalPages: Math.ceil(count / data.limit),
                    currentPage: data.page,
                  };
                  callback(null, output);
                }
              });
            }
            // If value for given key is not available in Redis
            else {
              // Fetch data from your database
              let reviews = Company.find({ _id: data.company_id })
                .select("reviews")
                .populate("reviews")
                .limit(data.limit * 1)
                .skip((data.page - 1) * data.limit)
                .exec((error, result) => {
                  if (error) {
                    console.log(error);

                    callback(err, "Error");
                  } else {
                    redisClient.setex(
                      "topReviews",
                      36000,
                      JSON.stringify(result[0].reviews)
                    );
                    // console.log("Reviews fetched Successfully")
                    callback(null, result);
                  }
                });
            }
          });
        } catch (error) {
          // Handle error
          // console.log("Error while working with redis")
          console.log(error);

          let reviews = Company.find({ _id: data.company_id })
            .select("reviews")
            .populate("reviews")
            .limit(data.limit * 1)
            .skip((data.page - 1) * data.limit)
            .exec((err, result) => {
              if (err) {
                console.log(err);
                callback(err, "Error");
              } else {
                console.log("Reviews fetched Successfully from DB");
                callback(null, result);
              }
            });
        }
      } else {
        let reviews = Company.find({ _id: data.company_id })
          .select("reviews")
          .populate("reviews")
          .limit(data.limit * 1)
          .skip((data.page - 1) * data.limit)
          .exec((err, result) => {
            if (err) {
              console.log(err);
              callback(err, "Error");
            } else {
              // console.log("Reviews fetched Successfully from DB - page not 1 or redis off")
              callback(null, result);
            }
          });
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
            const reviews = await Reviews.find({
                $or:
                    [{ companyId: new ObjectId(data.companyId), approvalstatus: 'Approved' },
                    { studentId: new ObjectId(data.studentId), approvalstatus: 'Under Review' }]
            }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
                
            const count = await Reviews.countDocuments({ companyId: data.companyId });
            //console.log("count" + count);
            //console.log(reviews)
            const result = ({
                reviews,
                totalPages: Math.ceil(count / data.limit),
                currentPage: data.page
            });
        
            console.log("Reviews fetched Successfully")
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


    default: {
      console.log("Default switch");
    }
  }
}

exports.handle_request = handle_request;
