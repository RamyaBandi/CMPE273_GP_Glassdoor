const mongoose = require("mongoose");
const Company = require('../models/Company');
const Jobs = require('../models/Jobs');
function handle_request(msg, callback) {

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


				break;
			}
		default:
			{
				console.log("Default switch")
			}

	}
};



exports.handle_request = handle_request;