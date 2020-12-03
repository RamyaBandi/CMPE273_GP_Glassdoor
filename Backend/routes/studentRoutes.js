const express = require("express");
const studentRouter = express.Router();
const studentServices = require("../servicesMongo/studentServices");
const studentKafkaServices = require("../servicesKafka/studentServices");
//const {checkAuth}=require("../config/passport")
const {
    POST_STUDENT_SIGNUP,
    GET_STUDENT_SIGNUP,
    PUT_STUDENT_SIGNUP,
    PUT_STUDENT_DEMOGRAPHICS,
    PUT_STUDENT_JOBPREFERENCE,
    POST_RESUME_UPLOAD,
    GET_STUDENT_RESUMES,
    PUT_PRIMARY_RESUME,
    DELETE_STUDENT_RESUME,
    GET_COUNT_RATINGS,
    GET_PHOTOS_UPLOADED
} = require("../config/routeConstants")

if (process.env.KAFKA_SWITCH === 'true') {
    console.log("in kafka service")
    studentRouter.route(POST_STUDENT_SIGNUP).post(studentKafkaServices.createStudentProfile);
studentRouter.route(GET_STUDENT_SIGNUP).get(studentKafkaServices.getSudentDetails);
studentRouter.route(PUT_STUDENT_SIGNUP).put(studentKafkaServices.updateStudentDetails);
studentRouter.route(PUT_STUDENT_DEMOGRAPHICS).put(studentKafkaServices.updateStudentDemographics);
studentRouter.route(PUT_STUDENT_JOBPREFERENCE).put(studentKafkaServices.updateStudentJobPreferences);
studentRouter.route(POST_RESUME_UPLOAD).post(studentKafkaServices.updateStudentResume);
studentRouter.route(GET_STUDENT_RESUMES).get(studentKafkaServices.getStudentResumes);
studentRouter.route(PUT_PRIMARY_RESUME).put(studentKafkaServices.updatePrimaryResume);
studentRouter.route(DELETE_STUDENT_RESUME).delete(studentKafkaServices.deleteStudentResume);
studentRouter.route(GET_COUNT_RATINGS).get(studentKafkaServices.getRatingsCount);
studentRouter.route(GET_PHOTOS_UPLOADED).get(studentKafkaServices.getPhotosUploaded);
}
else{
studentRouter.route(POST_STUDENT_SIGNUP).post(studentServices.createStudentProfile);
studentRouter.route(GET_STUDENT_SIGNUP).get(studentServices.getSudentDetails);
studentRouter.route(PUT_STUDENT_SIGNUP).put(studentServices.updateStudentDetails);
studentRouter.route(PUT_STUDENT_DEMOGRAPHICS).put(studentServices.updateStudentDemographics);
studentRouter.route(PUT_STUDENT_JOBPREFERENCE).put(studentServices.updateStudentJobPreferences);
studentRouter.route(POST_RESUME_UPLOAD).post(studentServices.updateStudentResume);
studentRouter.route(GET_STUDENT_RESUMES).get(studentServices.getStudentResumes);
studentRouter.route(PUT_PRIMARY_RESUME).put(studentServices.updatePrimaryResume);
studentRouter.route(DELETE_STUDENT_RESUME).delete(studentServices.deleteStudentResume);
studentRouter.route(GET_COUNT_RATINGS).get(studentServices.getRatingsCount);
studentRouter.route(GET_PHOTOS_UPLOADED).get(studentServices.getPhotosUploaded);

}


module.exports = studentRouter;