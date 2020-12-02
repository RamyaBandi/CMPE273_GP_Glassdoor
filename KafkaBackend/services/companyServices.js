const mongoose = require("mongoose");
const Company = require('../models/Company');

function handle_request(msg, callback) {

	console.log("Inside Company Services ->kafka backend");
	console.log(msg);
	switch (msg.api) {
		case "POST_COMPANY_SIGNUP":
			{
				let data = msg.body
				let company = Company({
					companyName: data.companyName,
					email: data.email
				})
				company.save((err, result) => {
					if (err) {
						console.log("Error creating company profile" + err)
						callback(err, 'Error')
					}
					else {
						console.log("Created Company Profile : " + JSON.stringify(result))
						callback(null, result)
					}
				})
				break;
			}
		case "PUT_COMPANY_SIGNUP":
			{
				let data = msg.body

				let company_update = {
					companyName: data.companyName,
					website: data.website,
					companySize: data.companySize,
					companyType: data.companyType,
					revenue: data.revenue,
					headquarters: data.headquarters,
					industry: data.industry,
					mission: data.mission,
					description: data.description,
					ceoName: data.ceoName,
				}
				Company.findByIdAndUpdate(data.company_id, company_update, (err, result) => {
					if (err) {
						console.log("Error updating company profile" + err)
						callback(err, 'Error')
					}
					else {
						console.log("Update Company Profile : " + JSON.stringify(result))
						callback(null, result)
					}
				})

				break;
			}
		case "GET_COMPANY_DETAILS":
			{
				let data = msg.body
				let companyDetails = Company.find({ _id: data.companyId }).exec((err, result) => {

					if (err) {
						callback(err, 'Error')
					}
					else {
						console.log("Company Details fetched Successfully");
						console.log(result);
						callback(null, result)
					}
				})
				break;
			}
		case "GET_COMPANY_SIGNUP":
			{
				let data = msg.body
				let companyDetails = Company.find({ _id: data.companyId }).exec((err, result) => {

					if (err) {
						console.log(err);
						callback(err, 'Error')
					}
					else {
						console.log("Company Details fetched Successfully");
						console.log(result);
						callback(null, result)
					}
				})
				break;
			}
		case "POST_COMPANYVIEWS":
			{
				let date = Date()
				console.log("Date", date)
				console.log("Date after formatting", formatDate(date))
				console.log("Inside Company Profile POST views");
				console.log("req body" + JSON.stringify(msg.body));
				let data = msg.body
				let companyviews = CompanyViews({
					companyId: data.companyId,
					companyName: data.companyName,
					Date: formatDate(date)
					// email: data.email
				})
				companyviews.save((err, result) => {
					if (err) {
						console.log("Error saving views" + err)
						callback(err, 'Error')
					}
					else {
						console.log("Saved company view : " + JSON.stringify(result))
						callback(null, result)
					}
				})
				break;
			}
		case "PUT_FEATURED_REVIEWS":
			{
				let data = msg.body
				let featured_update = {
					featuredReview: data.featuredId
				}
				Company.findByIdAndUpdate(data.companyId, { $push: featured_update }, (err, result) => {
					if (err) {
						console.log("Error updating company profile" + err)
						callback(err, 'Error')
					}
					else {
						console.log("Update Company Featured Reviews : " + JSON.stringify(result.featuredReview))
						callback(null, result)
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

function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;

	return [year, month, day].join('-');
}

exports.handle_request = handle_request;