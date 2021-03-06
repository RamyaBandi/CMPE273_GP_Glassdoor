const Jobs = require('../models/Jobs');
const Company = require('../models/Company')
const {

    RES_SUCCESS,
    RES_INTERNAL_SERVER_ERROR,
} = require("../config/routeConstants");

// const redisClient = require('../config/redisConnection');

module.exports.postCompanyJob = (req, res) => {
    console.log("Inside Jobs POST service");
    console.log(req.body)
    let data = req.body
    let job = Jobs({
        companyId: data.companyId,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        postedDate: Date.now(),
        industry: data.industry,
        responsibilities: data.responsibilities,
        country: data.country,
        remote: data.remote,
        streetAddress: data.streetAddress,
        city: data.city,
        state: data.state,
        zip: data.zip,
        averageSalary: data.averageSalary
    })
    job.save((err, result) => {

        if (err) {
            console.log("Error creating job")
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            // console.log(JSON.stringify(result));
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            Company.findOneAndUpdate({ _id: data.companyId }, { $push: { 'jobs': result._id } }, (error, results) => {
                if (error) {
                    console.log("Error Updating Company with job id")
                    console.log(error);
                    //res.setHeader(CONTENT_TYPE, APP_JSON);
                    res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                }
                else {
                    // console.log(JSON.stringify(result));
                    //res.setHeader(CONTENT_TYPE, APP_JSON);
                    console.log("Job created Successfully");
                    console.log(result);
                    res.status(RES_SUCCESS).send(result);
                }
            })

        }
    })
}

module.exports.updateCompanyJob = (req, res) => {
    console.log("Inside Jobs PUT service");
    console.log(req.body)
    let data = req.body

    Jobs.findOneAndUpdate({ _id: data.jobId }, {
        jobTitle: data.jobTitle,
        postedDate: Date.now(),
        industry: data.industry,
        responsibilities: data.responsibilities,
        country: data.country,
        remote: data.remote,
        streetAddress: data.streetAddress,
        city: data.city,
        state: data.state,
        zip: data.zip,
        averageSalary: data.averageSalary
    }, (err, result) => {

        if (err) {
            console.log("Error creating job")
            console.log(err);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Job updated Successfully");
            console.log(result);
            res.status(RES_SUCCESS).send(result);
        }
    })
}

module.exports.getAllJobs = async (req, res) => {
    console.log("Inside Job GET all service");
    console.log(req.query);
    let data = req.body;
    try {
        // data.page = 1;
        // data.limit = 10;
        const jobs = await Jobs.find().limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
        const count = await Jobs.countDocuments();
        const result = ({
            jobs,
            totalPages: Math.ceil(count / data.limit),
            currentPage: data.page
        });
        console.log("Jobs fetched successfully from DB");
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


module.exports.getCompanyJobs = async (req, res) => {
    console.log("Inside Company Jobs GET service");
    let data = req.query
    console.log(data)
    try {
        // data.page = 1;
        // data.limit = 10;
        const jobs = await Jobs.find({ companyId: data.companyId }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
        const count = await Jobs.countDocuments({ companyId: data.companyId });
        const result = ({
            jobs,
            totalPages: Math.ceil(count / data.limit),
            currentPage: data.page
        });
        console.log("Jobs fetched successfully from DB")
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

module.exports.getCompanyJobsByJobId = async (req, res) => {

    console.log("Inside Company Jobs By Job Id GET service");
    let data = req.query
    console.log(data)
    try {
        // data.page = 1;
        // data.limit = 10;
        const jobs = await Jobs.find({ _id: data.jobId }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
        const count = await Jobs.countDocuments({ _id: data.jobId });
        const result = ({
            jobs,
            totalPages: Math.ceil(count / data.limit),
            currentPage: data.page
        });
        console.log("Jobs fetched successfully from DB");
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

module.exports.getCompanyJobsByJobTitleOrCity = async (req, res) => {

    console.log("Inside Company Jobs By Job Title GET service");
    let data = req.query
    console.log(data)
    try {
        // data.page = 1;
        // data.limit = 10;
        if (data.jobTitle != null && data.city != null) {
            const jobs = await Jobs.find({ $and: [{ companyId: data.companyId, $or: [{ jobTitle: data.jobTitle, city: data.city }] }] }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
            const count = await Jobs.countDocuments({ companyId: data.companyId, jobTitle: data.jobTitle });
            const result = ({
                jobs,
                totalPages: Math.ceil(count / data.limit),
                currentPage: data.page
            });
            console.log("Jobs fetched successfully from DB");
            res.status(RES_SUCCESS).send(result);
        }
        else if (data.jobTitle != null && data.city == null) {
            const jobs = await Jobs.find({ companyId: data.companyId, jobTitle: data.jobTitle }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
            const count = await Jobs.countDocuments({ companyId: data.companyId, jobTitle: data.jobTitle });
            const result = ({
                jobs,
                totalPages: Math.ceil(count / data.limit),
                currentPage: data.page
            });
            console.log("Jobs fetched successfully from DB");
            res.status(RES_SUCCESS).send(result);
        }
        else {
            const jobs = await Jobs.find({ companyId: data.companyId, city: data.city }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
            const count = await Jobs.countDocuments({ companyId: data.companyId, city: data.city });
            const result = ({
                jobs,
                totalPages: Math.ceil(count / data.limit),
                currentPage: data.page
            });
            console.log("Jobs fetched successfully from DB");
            res.status(RES_SUCCESS).send(result);
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

module.exports.getCompanyJobsByJobTitle = async (req, res) => {

    console.log("Inside Company Jobs By Job Title GET service");
    let data = req.query
    console.log(data)
    let jobTitle=data.jobTitle.replace("%20"," ")
    console.log(jobTitle)
    try {
        // data.page = 1;
        // data.limit = 10;

        const jobs = await Jobs.find({ companyId: data.companyId, jobTitle: jobTitle }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
        const count = await Jobs.countDocuments({ companyId: data.companyId, jobTitle: jobTitle });
        const result = ({
            jobs,
            totalPages: Math.ceil(count / data.limit),
            currentPage: data.page
        });
        console.log("Jobs fetched successfully from DB");
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

module.exports.getCompanyJobsByCity = async (req, res) => {

    console.log("Inside Company Jobs By Job Title GET service");
    let data = req.query
    console.log(data)
    try {
        // data.page = 1;
        // data.limit = 10;
        const jobs = await Jobs.find({ companyId: data.companyId, city: data.city }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
        const count = await Jobs.countDocuments({ companyId: data.companyId, city: data.city });
        const result = ({
            jobs,
            totalPages: Math.ceil(count / data.limit),
            currentPage: data.page
        });
        console.log("Jobs fetched successfully from DB");
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