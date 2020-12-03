const mongoose = require("mongoose");
const Company = require('../models/Company');
const Applications = require('../models/Applications');
function handle_request(msg, callback) {

	console.log("Inside Company Statistics Services ->kafka backend");
	console.log(msg);
	switch (msg.api) {
		case "GET_STATISTICS_JOBS_COUNT":
			{
				let data = msg.body
				console.log(data)
				const jobs = Jobs.countDocuments({ companyId: data.companyId })
					.exec((err, result) => {
						if (err) {
							console.log("Error fetching job count")
							console.log(err);
							callback(err, 'Error')
						}
						else {
							console.log("Jobs Counted Successfully");
							console.log(result);
							callback(null, result)

						}
					});
				break;
			}
		case "GET_STATISTICS_APPLICANT_DEMOGRAPHICS":
			{
				let data = msg.body
				console.log(data)

				Company.find({ _id: data.companyId }, 'jobs')
					.exec((err, jobList) => {
						if (err) {
							console.log("Error fetching job count")
							console.log(err);
							callback(err, 'Error')
						}
						else {
							console.log("Jobs retrieved Successfully");
							console.log(jobList[0].jobs);
							Applications
								.aggregate([
									{ $match: { jobId: { $in: jobList[0].jobs } } },
									{
										$lookup:
										{
											from: "students",
											localField: "studentId",
											foreignField: "_id",
											as: "student"
										}
									},
									{ $project: { student: { race: 1, gender: 1, veteranStatus: 1, disability: 1 }, _id: 0 } },
									{ $group: { _id: "$student", "doc": { "$first": "$$ROOT" } } },
									{ $replaceRoot: { "newRoot": "$doc" } }
								])
								.exec((err, applications) => {
									if (err) {
										console.log("Error fetching Applications")
										console.log(err);
										callback(err, 'Error')
									}
									else {
										let race = {
											'American Indian or Alaska Native': 0,
											'Asian': 0,
											'Black or African American': 0,
											'Native Hawaiian or Other Pacific Islander': 0,
											'White': 0,
											'Hispanic or Latino': 0,
											'Do not wish to Disclose': 0
										}
										let gender = {
											'Male': 0,
											'Female': 0,
											'Other': 0,
											'Do not wish to Disclose': 0
										}
										let veteranStatus = {
											'Not a Veteran': 0,
											'Veteran': 0,
											'Do not wish to Disclose': 0
										}
										let disability = {
											'Have a Disability': 0,
											'Do not have a Disability': 0,
											'Do not wish to Disclose': 0
										}
										applications.map((app) => {
											race[app.student[0].race] = race[app.student[0].race] + 1
											gender[app.student[0].gender] = gender[app.student[0].gender] + 1
											veteranStatus[app.student[0].veteranStatus] = veteranStatus[app.student[0].veteranStatus] + 1
											disability[app.student[0].disability] = disability[app.student[0].disability] + 1

										})
										console.log("Demographics Counted Successfully");
										let out = {
											race: race,
											gender: gender,
											veteranStatus: veteranStatus,
											disability: disability
										}
										callback(null, out)

									}
								})
						}

					})
				break;
			}
		case "GET_STATISTICS_APPLICATIONS_COUNT":
			{
				console.log("Inside Company Jobs Statistics GET service");
				let data = msg.body
				console.log(data)
				Company.find({ _id: data.companyId }, 'jobs')
					.exec((err, jobList) => {
						if (err) {
							console.log("Error fetching job count")
							console.log(err);
							callback(err, 'Error')
						}
						else {
							console.log("Jobs retrieved Successfully");
							console.log(jobList[0].jobs);
							Applications
								.aggregate([
									{ $match: { jobId: { $in: jobList[0].jobs } } },
									{ $group: { _id: "$applicationstatus", count: { "$sum": 1 } } }
								])
								.exec((err, applications) => {
									if (err) {
										console.log("Error fetching Applications")
										console.log(err);
										callback(err, 'Error')
									}
									else {

										console.log("Demographics Counted Successfully");
										let out = {
											'Applied': 0,
											'Selected': 0,
											'Rejected': 0
										}
										applications.map((stat) => {
											if (stat._id === "Applied") {
												out.Applied = stat.count
											}
											else if (stat._id === "Selected") {
												out.Selected = stat.count
											}
											else if (stat._id === "Rejected") {
												out.Rejected = stat.count
											}
										})
										callback(null, out)
									}
								})
						}

					})

				break;
			}
		default:
			{
				console.log("Default switch")
			}

	}
};



exports.handle_request = handle_request;