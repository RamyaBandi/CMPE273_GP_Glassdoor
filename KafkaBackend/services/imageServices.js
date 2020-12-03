const mongoose = require("mongoose");
const Company = require('../models/Company');
const Student=require('../models/Student')


async function handle_request(msg, callback) {

	console.log("Inside Image Services ->kafka backend");
	console.log(msg);
	switch (msg.api) {
		case "POST_IMAGE_USER_PROFILE":
			{
				console.log(msg.body)
				let data = msg.body
				Company.findByIdAndUpdate(data.companyId, { imageUrl: data.imageUrl}, (err, result) => {
                    if (err) {
                        console.log('Error occured while updating Profile image link' + err)
                        callback(err, 'Error')
                    }
                    else {
                        console.log('Image link set' + result)
						callback(null, result)
                    }
                })
				break;
			}
		case "POST_IMAGE_STUDENT_PROFILE":
			{
				let data = msg.body
				Student.findByIdAndUpdate(data.studentId, { imageUrl: url}, (err, result) => {
                    if (err) {
                        console.log('Error occured while updating Profile image link' + err)
						callback(err, 'Error')
                    }
                    else {
                        console.log('Image link set' + result)
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



exports.handle_request = handle_request;