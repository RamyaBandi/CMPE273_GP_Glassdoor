const mongoose = require("mongoose");
const Company = require('../models/Company');
const Jobs = require('../models/Jobs');
async function handle_request(msg, callback) {

	console.log("Inside Company Services ->kafka backend");
	console.log(msg);
	switch (msg.api) {
		case "POST_COMPANY_JOB":
			{
				console.log(msg.body)
				let data = msg.body
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
						callback(err, 'Error')
					}
					else {

						Company.findOneAndUpdate({ _id: data.companyId }, { $push: { 'jobs': result._id } }, (error, results) => {
							if (error) {
								console.log("Error Updating Company with job id")
								console.log(error);
								callback(err, 'Error')
							}
							else {
								console.log("Job created Successfully");
								console.log(result);
								callback(null, result)
							}
						})

					}
				})
				break;
			}
		case "PUT_COMPANY_JOB":
			{
				let data = msg.body

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
						callback(err, 'Error')
					}
					else {
						console.log("Job updated Successfully");
						console.log(result);
						callback(null, result)
					}
				})
				break;
			}
		case "GET_COMPANY_JOBS":
			{
				let data = msg.body
				try {
					const jobs = await Jobs.find({ companyId: data.companyId }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec(async (error, jobs) => {
						// console.log(jobs);
						console.log(error)
						if (error) {
							console.log(JSON.stringify(err));
							callback(err, 'Error')
						}
						else {
							await Jobs.countDocuments({ companyId: data.companyId }).exec((err, count) => {
								const result = ({
									jobs,
									totalPages: Math.ceil(count / data.limit),
									currentPage: data.page
								});
								console.log("Jobs fetched successfully from DB")
								console.log(result)
								callback(null, result)
							});

						}
					});

				}
				catch (err) {
					if (err) {
						console.log(JSON.stringify(err));
						callback(err, 'Error')
					}
				}

				break;
			}
		case "GET_ALL_JOBS":
			{
				Jobs.find((err, result) => {

					if (err) {
						console.log("Error fetching job")
						console.log(err);
						callback(err, 'Error')
					}
					else {
						console.log("Jobs fetched Successfully");
						console.log(result);
						callback(null, result)

					}
				})
				break;
			}
		case "GET_COMPANY_JOBS_BY_JOBTITLE_OR_CITY":
			{
				let data = msg.body
				console.log(data)
				try {
					data.page = 1;
					data.limit = 10;
					const jobs = Jobs.find({ $and: [{ companyId: data.companyId, $or: [{ jobTitle: data.jobTitle, city: data.city }] }] }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
					const count = Jobs.countDocuments({ companyId: data.companyId, jobTitle: data.jobTitle });
					const result = ({
						jobs,
						totalPages: Math.ceil(count / data.limit),
						currentPage: data.page
					});
					console.log("Jobs fetched successfully from DB");
					callback(null, result)
				}
				catch {
					if (err) {
						console.log(err);
						//res.setHeader(CONTENT_TYPE, APP_JSON);
						callback(err, 'Error')
					}
				}
				break;
			}
		case "GET_COMPANY_JOBS_BY_JOBTITLE":
			{
				let data = msg.body
				console.log(data)
				try {
					data.page = 1;
					data.limit = 10;
					const jobs = Jobs.find({ companyId: data.companyId, jobTitle: data.jobTitle }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
					const count = Jobs.countDocuments({ companyId: data.companyId, jobTitle: data.jobTitle });
					const result = ({
						jobs,
						totalPages: Math.ceil(count / data.limit),
						currentPage: data.page
					});
					console.log("Jobs fetched successfully from DB");
					callback(null, result)
				}
				catch {
					if (err) {
						console.log(err);
						//res.setHeader(CONTENT_TYPE, APP_JSON);
						callback(err, 'Error')
					}
				}
				break;
			}
		case "GET_COMPANY_JOBS_BY_CITY":
			{
				let data = msg.body
				console.log(data)
				try {
					data.page = 1;
					data.limit = 10;
					const jobs = Jobs.find({ companyId: data.companyId, city: data.city }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
					const count = Jobs.countDocuments({ companyId: data.companyId, city: data.city });
					const result = ({
						jobs,
						totalPages: Math.ceil(count / data.limit),
						currentPage: data.page
					});
					console.log("Jobs fetched successfully from DB");
					callback(null, result)
				}
				catch {
					if (err) {
						console.log(err);
						callback(err, 'Error')
					}
				}
				break;
			}
		case "GET_COMPANY_JOB_BY_JOBID":
			{
				let data = req.query
				console.log(data)
				try {
					data.page = 1;
					data.limit = 10;
					const jobs = Jobs.find({ _id: data.jobId }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
					const count = Jobs.countDocuments({ _id: data.jobId });
					const result = ({
						jobs,
						totalPages: Math.ceil(count / data.limit),
						currentPage: data.page
					});
					console.log("Jobs fetched successfully from DB");
					callback(null, result)
				}
				catch {
					if (err) {
						console.log(err);
						callback(err, 'Error')
					}
				}
				break;
			}
		default:
			{
				console.log("Default switch")
			}

	}
};



exports.handle_request = handle_request;