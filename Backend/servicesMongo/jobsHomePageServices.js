const Reviews = require('../models/Reviews');
const Company = require('../models/Company')
const Jobs = require('../models/Jobs')
const salaryRouter = require('../routes/jobsHomePageRoutes');

// const { jwtsecret } = require('../config/mysqlinit')

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

module.exports.jobsHomePage = async (req, res) => {
//Salary needs to be present, most rated
    let jobsData = await Jobs.find({}, 
    { 'companyId': 1, 'jobTitle': 1, 'postedDate': 1, 'industry': 1,'streetAddress':1, 'city' : 1, 'state':1, 'zip' : 1});
    console.log("Jobs Data", jobsData)

    let datasets = await Promise.all(jobsData.map(async (data) => {
        let products = {};

        let companyResults = await Company.aggregate([
            { $match: { _id: data.companyId } },
            {
                $project: {
                    _id: 1,
                    companyName: 1,
                    headquarters: 1,
                    website: 1,
                    NumberOfReviews: "$reviews" ? { $size: "$reviews" } : null,
                    // salaryReviews: "$salaries" ? { $size: "$salaries" } : null,
                    // interviewReviews: "$interviews" ? { $size: "$interviews" } : null
                }
            }]).exec();


        let averageRating = await Reviews.aggregate([
            { $group: { _id: data.companyId, averageRating: { $avg: "$overallRating" } } }]).exec();


        products._id = companyResults[0]._id;
        products.companyName = companyResults[0].companyName
        // products.headquarters = companyResults[0].headquarters
        // products.website = companyResults[0].website
        // products.NumberOfReviews = companyResults[0].NumberOfReviews
        // products.salaryReviews = companyResults[0].salaryReviews
        // products.interviewReviews = companyResults[0].interviewReviews
        products.averageRating = averageRating[0].averageRating
        products.jobTitle = data.jobTitle;
        products.streetAddress = data.streetAddress;
        products.city = data.city;
        products.state = data.state;
        products.zip = data.zip;
        products.postedDate = data.postedDate;
        products.industry = data.industry;


        return products;
    }));

    console.log("Outside jobs", datasets)
    res.status(RES_SUCCESS).end(JSON.stringify(datasets));
}