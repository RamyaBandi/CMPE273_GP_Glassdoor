const mongoose = require("mongoose");
const Student = require('../models/Student');
const Resumes = require('../models/Resumes')
const Reviews=require('../models/Reviews')
const Photos=require('../models/Photos')



async function handle_request(msg, callback) {

	console.log("Inside Student Services ->kafka backend");
	console.log(msg);
	switch (msg.api) {
		case "POST_STUDENT_SIGNUP":
			{
				console.log(msg.body)
				let data = msg.body
				let student = Student({
					studentName: data.studentName,
					email: data.email
				})
				student.save((err, result) => {
					if (err) {
						console.log("Error creating Student profile" + err)
						callback(err, 'Error')
					}
					else {
						console.log("Created Student Profile : " + JSON.stringify(result))
						callback(null, result)
					}
				})
				break;
			}
		case "GET_STUDENT_SIGNUP":
			{
				let data = msg.body

				let studentDetails = Student.find({ _id: data.studentId }).exec((err, result) => {

					if (err) {
						console.log(err);
						//res.setHeader(CONTENT_TYPE, APP_JSON);
						callback(err, 'Error')
					}
					else {
						// console.log(JSON.stringify(result));
						//res.setHeader(CONTENT_TYPE, APP_JSON);
						console.log("Student Details fetched Successfully");
						console.log(result);
						callback(null, result)
					}
				})
				break;
			}
		case "PUT_STUDENT_SIGNUP":
			{
				let data = msg.body
				let student_update = {
					studentName: data.studentName,
					interestedJobtitle: data.interestedJobtitle,
					phoneNumber: data.phoneNumber,
					website: data.website,
					education: data.education,
					experience: data.experience,
					location: data.location,
					degree: data.degree,
					yearsOfExperience: data.yearsOfExperience,
					aboutMe: data.aboutMe,
				}
				Student.findByIdAndUpdate(data.studentId, student_update, (err, result) => {
					if (err) {
						console.log("Error updating student profile" + err)
						callback(err, 'Error')
					}
					else {
						console.log("Update student Profile : " + JSON.stringify(result))
						callback(null, result)
					}
				})

				break;
			}
		case "PUT_STUDENT_DEMOGRAPHICS":
			{
				let data = msg.body
				let demographics_update = {
					race:data.race,
					gender:data.gender,
					disability:data.disability,
					veteranStatus:data.veteranStatus,
				}
				Student.findByIdAndUpdate(data.studentId, demographics_update, (err, result) => {
					if (err) {
						console.log("Error updating student profile" + err)
						callback(err, 'Error')
					}
					else {
						console.log("Update student demographics : " + JSON.stringify(result))
						callback(null, result)
					}
				})
				break;
			}
		case "PUT_STUDENT_JOBPREFERENCE":
			{
				let data = msg.body
				console.log(data)
				let jobPreference_update = {
					jobSearchStatus: data.jobSearchStatus,
					jobTitle: data.jobTitle,
					targetedSalary: data.targetedSalary,
					relocationPreference: data.relocationPreference,
					industryPreference: data.industryPreference,
				}
				Student.findByIdAndUpdate(data.studentId, jobPreference_update, (err, result) => {
					if (err) {
						console.log("Error updating student profile" + err)
						callback(err, 'Error')
					}
					else {
						console.log("Update student jobPreference : " + JSON.stringify(result))
						callback(null, result)
					}
				})
				break;
			}
		case "POST_RESUME_UPLOAD":
			{
				let data = msg.body
				console.log(data)
				let resume_details = Resumes({
                    studentId: data.studentId,
                    uploadDate: Date.now(),
                    uploadLink: data.resumeUrl,
                    uploadFileName: data.fileName
                })
                resume_details.save((err, result) => {
                    if (err) {
                        console.log("Error creating Student profile" + err)
                        callback(err, 'Error')
                    }
                    else {
                        console.log("Created Student Resumes : " + JSON.stringify(result))
                        Student.findByIdAndUpdate(data.studentId, { $push: { "resumes": result._id, "resumeNames": data.fileName } }, (err, result) => {
                            if (err) {
                                console.log('Error occured while updating Profile image link' + err)
                                callback(err, 'Error')
                            }
                            else {
                                console.log('Image link set' + result)
                                callback(null, result)
                            }
                        })

                    }
                }) 
				break;
			}
		case "GET_STUDENT_RESUMES":
			{

				try {
					let data = msg.body
					let studentDetails = await Resumes.find({studentId: data.studentId}).exec();   
					const count = await Resumes.countDocuments({studentId: data.studentId });
					console.log(studentDetails)
					callback(null, studentDetails)
					}
					catch {
					 console.log("in catch block")
					}  
				break;
			}

			case "PUT_PRIMARY_RESUME":
				{
					let data = msg.body
					let primaryresume = {
						primaryResume: data.resumeId,
					}
					Student.findByIdAndUpdate(data.studentId, primaryresume, (err, result) => {
						if (err) {
							console.log("Error updating student profile" + err)
							callback(err, 'Error')
						}
						else {
							console.log("Update student jobPreference : " + JSON.stringify(result))
							callback(null, result)
						}
					})
					break;
				}

				case "DELETE_STUDENT_RESUME":
			{
				let data = msg.body
				console.log(data)
				Resumes.findByIdAndDelete(data.resumeId, (err, result) => {
					if (err) {
						console.log("Error updating student profile" + err)
						callback(err, 'Error')
					}
					else {
						console.log("Update student jobPreference : " + JSON.stringify(result))
						Student.updateOne( {_id: data.studentId}, { $pullAll: {resumes: [data.resumeId] } },(error,result)=>{
							if(error){
								callback(err, 'Error')
							}
							else{
								callback(null, result)
							}
						} )
						
						
					}
				})
				break;
			}

			case "GET_COUNT_RATINGS":
			{	
				try {
					let data = msg.body
					console.log(data)
					const studentreviews = await Reviews.find({ studentId: data.studentId })
					.populate({ path: 'companyId', model: 'Company', select: 'companyName' })
					.exec();
					const count = await Reviews.countDocuments({ studentId: data.studentId });
					console.log("count" + count);
					console.log(studentreviews)
					//let value= toString(count)
				
					callback(null, studentreviews)
					}
					catch {
						console.log("in catch")
					}   
				break;
			}

			case "GET_PHOTOS_UPLOADED":
			{	
				try {
					let data = msg.body
					console.log(data)
					let PhotoDetails = await Photos.find({studentId: data.studentId}).exec();
					const count = await Photos.countDocuments({studentId: data.studentId });
					console.log(PhotoDetails)
				
					callback(null, PhotoDetails)
					}
					catch {
					 console.log("in catch")
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