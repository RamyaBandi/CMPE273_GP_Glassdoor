const { response } = require('express');
const con = require('../config/mongoConnection');
const ObjectId = require('mongoose').Types.ObjectId;
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
const Reviews = require('../models/Reviews')
const redisClient = require('../config/redisConnection')

module.exports.updateReviewHelpfulCount = (req, res) => {
    console.log("Inside Review PUT service");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body
    Reviews.findByIdAndUpdate(data.reviewId, { $inc: { helpfulCount: 1 } }, (err, result) => {
        if (err) {
            console.log("Error updating review" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Update Helpful count for Review : " + JSON.stringify(result))
            res.status(200).end(JSON.stringify(result))
        }
    })
}

module.exports.postStudentReview = (req, res) => {

    console.log("Inside Reviews POST service");
    console.log(req.body)
    let data = req.body
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
    })
    reviews.save((err, result) => {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {

            // console.log("Review Doc created : " + JSON.stringify(result));
            Company.findOneAndUpdate({ _id: data.companyId }, { $push: { "reviews": result._id } }, (error, results) => {
                if (error) {
                    console.log("Error adding review to company" + error)
                    res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                }
                else {
                    Student.findOneAndUpdate({ _id: data.studentId }, { $push: { "companyReviews": result._id } }, (error2, results2) => {
                        if (error2) {
                            console.log("Error adding review to Student" + error2)
                            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error2));
                        }
                        else {
                            console.log("Review inserted Successfully")
                            res.status(RES_SUCCESS).end(JSON.stringify(results2));
                        }
                    })

                }
            })
        }
    })
}


module.exports.getCompanyReviews = async (req, res) => {

    console.log("Inside Company Reviews GET service");
    let data = req.query
    console.log(data)

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
                                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
                            }
                            else {

                                const output = ({
                                    reviews: JSON.parse(redisout),
                                    totalPages: Math.ceil(count / data.limit),
                                    currentPage: data.page
                                });
                                // console.log(output)
                                res.status(RES_SUCCESS).send(output);
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
                        .exec(async (error, reviews) => {

                            if (error) {
                                console.log(error);
                                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
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

                                res.status(RES_SUCCESS).end(JSON.stringify(result));


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


            const reviews = await Reviews.find({ companyId: data.companyId, approvalstatus: "Approved" }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
            const count = await Reviews.countDocuments({ companyId: data.companyId, approvalstatus: "Approved" });

            console.log("count" + count);
            console.log(reviews)
            const result = ({
                reviews,
                totalPages: Math.ceil(count / data.limit),
                currentPage: data.page
            });

            console.log("Reviews fetched Successfully from DB - page not 1 or redis off")
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

}


module.exports.getStudentReviews = (req, res) => {

    console.log("Inside Student Reviews GET service");
    console.log(req.query)
    let data = req.query
    let reviews = Student.find({ _id: data.studentId }).select('companyReviews').populate('companyReviews').limit(data.limit * 1).skip((data.page - 1) * data.limit).exec((err, result) => {

        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else {
            // console.log(JSON.stringify(result));
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            console.log("Reviews fetched Successfully")
            res.status(RES_SUCCESS).send(result);
        }
    })
}

module.exports.getMostPositiveReview = async (req, res) => {

    console.log("Inside Positive Review GET service");
    let data = req.query
    console.log(data)
    try {
        const reviews = await Reviews.find({ companyId: data.companyId }).sort('-helpfulCount').exec();
        const result = ({
            reviews
        });
        //res.status(RES_SUCCESS).send(result);
        const maxHelpfulCount = result.reviews[0].helpfulCount;
        console.log(maxHelpfulCount);
        try {
            const positiveReviews = await Reviews.find({ helpfulCount: maxHelpfulCount }).sort('-overallRating').exec();
            const result2 = ({
                positiveReviews
            });
            res.status(RES_SUCCESS).send(result2);
        }
        catch {
            if (err) {
                console.log(err);
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
            }
        }
    }
    catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
}

module.exports.getMostNegativeReview = async (req, res) => {

    console.log("Inside Negative Review GET service");
    let data = req.query
    console.log(data)
    try {
        const reviews = await Reviews.find({ companyId: data.companyId }).sort('-helpfulCount').exec();
        const result = ({
            reviews
        });
        //res.status(RES_SUCCESS).send(result);
        const maxHelpfulCount = result.reviews[0].helpfulCount;
        console.log(maxHelpfulCount);
        try {
            const negativeReviews = await Reviews.find({ helpfulCount: maxHelpfulCount }).sort('overallRating').exec();
            const result2 = ({
                negativeReviews
            });
            res.status(RES_SUCCESS).send(result2);
        }
        catch {
            if (err) {
                console.log(err);
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
            }
        }
    }
    catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
}

module.exports.postReplyFromCompany = (req, res) => {

    console.log("Inside Reply Post service");
    console.log(req.body)
    let data = req.body

    let reply = {

        reply: data.reply,
        replyTimeStamp: Date.now()
    }
    //console.log(featured_update)
    Reviews.findByIdAndUpdate(data.reviewId, reply, (err, result) => {
        console.log(result.reply)
        console.log(result)
        if (err) {
            console.log("Error updating company profile" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Update Company Featured Reviews : " + JSON.stringify(result))
            res.status(200).end(JSON.stringify(result))
        }
    })

}

module.exports.getReviewAverage = async (req, res) => {

    console.log("Inside Review Average GET service");
    let data = req.query
    console.log(data.companyId)
    try {
        const avgReviews = await Reviews.aggregate([

            { $match: { companyId: new ObjectId(data.companyId) } },
            {
                $group: {
                    _id: null,
                    averageOverallRating: { $avg: "$overallRating" },
                    averageRecommendedRating: { $avg: "$recommendedRating" },
                    averageCeoRating: { $avg: "$ceoRating" }
                }
            }

        ]).exec();
        const result = ({
            averageOverallRating: avgReviews[0].averageOverallRating.toFixed(2),
            averageRecommendedRating: avgReviews[0].averageRecommendedRating.toFixed(2),
            averageCeoRating: avgReviews[0].averageCeoRating.toFixed(2)
        });

        res.status(RES_SUCCESS).send(result);
        console.log(avgReviews[0].averageRecommendedRating.toFixed(2));
    }
    catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
}

module.exports.putReviewApprove = (req, res) => {
    console.log("Inside Approve Review PUT service");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body
    Reviews.findByIdAndUpdate(data.reviewId, { approvalstatus: "Approved" }, (err, result) => {
        if (err) {
            console.log("Error updating review" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Update Approval status for a Review to Approved: " + JSON.stringify(result))
            res.status(200).end(JSON.stringify(result))
        }
    })
}

module.exports.putReviewReject = (req, res) => {
    console.log("Inside Reject Review PUT service");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body
    Reviews.findByIdAndUpdate(data.reviewId, { approvalstatus: "Rejected" }, (err, result) => {
        if (err) {
            console.log("Error updating review" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Update Approval status for a Review to Rejected : " + JSON.stringify(result))
            res.status(200).end(JSON.stringify(result))
        }
    })
}

module.exports.getReviewDetails = async (req, res) => {

    console.log("Inside Review Details GET service");
    console.log(req.query)
    let data = req.query
    let reviews = await Reviews.findById(data.reviewId).exec();
    try {
        // console.log(JSON.stringify(result));
        //res.setHeader(CONTENT_TYPE, APP_JSON);
        console.log("Review details fetched Successfully")
        res.status(RES_SUCCESS).send(reviews);
    }
    catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
}

module.exports.getAllReviews = async (req, res) => {

    console.log("Inside Review Details GET service");
    let data = req.query;
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
        res.status(RES_SUCCESS).send(result);
    } catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
}

module.exports.getApprovedCompanyReviews = async (req, res) => {

    console.log("Inside Company Reviews GET service");
    let data = req.query
    console.log(data)

    if (process.env.REDIS_SWITCH == "true" && data.page == '1') {
        try {
            redisClient.get('topReviews', async (err, redisout) => {
                // If value for key is available in Redis
                //console.log("in redis get")
                //console.log(err)
                // console.log(redisout)

                if (redisout !== null) {
                    // send data as output
                    console.log("Data exists in redis")
                    //console.log(redisout.length)
                    Company.countDocuments({ type: 'reviews' }, (err, count) => {
                        if (err) {
                            console.log(err);
                            //res.setHeader(CONTENT_TYPE, APP_JSON);
                            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
                        }
                        else {

                            let output = {
                                reviews: JSON.parse(redisout),
                                totalPages: Math.ceil(count / data.limit),
                                currentPage: data.page
                            }
                            res.status(RES_SUCCESS).send(output);
                        }
                    })



                }
                // If value for given key is not available in Redis
                else {
                    // Fetch data from your database
                    let reviews = Company.find({ _id: data.companyId }).select('reviews').populate('reviews').limit(data.limit * 1).skip((data.page - 1) * data.limit).exec((error, result) => {

                        if (error) {
                            //console.log(error);
                            //res.setHeader(CONTENT_TYPE, APP_JSON);
                            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                        }
                        else {
                            // console.log(JSON.stringify(result));
                            // store that in Redis
                            // params: key, time-to-live, value
                            redisClient.setex('topReviews', 36000, JSON.stringify(result[0].reviews));

                            // send data as output
                            //res.setHeader(CONTENT_TYPE, APP_JSON);
                            //console.log("Reviews fetched Successfully")
                            res.status(RES_SUCCESS).send(result[0].reviews);
                        }
                    })

                }
            })
        } catch (error) {
            // Handle error
            // console.log("Error while working with redis")
            //console.log(error);

            let reviews = Company.find({ _id: data.companyId }).select('reviews').populate('reviews').limit(data.limit * 1).skip((data.page - 1) * data.limit).exec((err, result) => {

                if (err) {
                    //console.log(err);
                    //res.setHeader(CONTENT_TYPE, APP_JSON);
                    res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
                }
                else {
                    // console.log(JSON.stringify(result));
                    //res.setHeader(CONTENT_TYPE, APP_JSON);
                    console.log("Reviews fetched Successfully from DB")
                    res.status(RES_SUCCESS).send(result);
                }
            })
        }

    }
    else {
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

            console.log("Reviews fetched Successfully from DB - page not 1 or redis off")
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

}

