const express = require("express");
const studentRouter = express.Router();
const studentServices = require("../servicesMongo/studentServices");
const studentKafkaServices = require("../servicesKafka/studentServices");
const { checkAuth } = require("../config/passport")
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
    studentRouter.route(POST_STUDENT_SIGNUP).post(checkAuth, studentKafkaServices.createStudentProfile);
    studentRouter.route(GET_STUDENT_SIGNUP).get(checkAuth, studentKafkaServices.getSudentDetails);
    studentRouter.route(PUT_STUDENT_SIGNUP).put(checkAuth, studentKafkaServices.updateStudentDetails);
    studentRouter.route(PUT_STUDENT_DEMOGRAPHICS).put(checkAuth, studentKafkaServices.updateStudentDemographics);
    studentRouter.route(PUT_STUDENT_JOBPREFERENCE).put(checkAuth, studentKafkaServices.updateStudentJobPreferences);
    studentRouter.route(POST_RESUME_UPLOAD).post(checkAuth, studentKafkaServices.updateStudentResume);
    studentRouter.route(GET_STUDENT_RESUMES).get(checkAuth, studentKafkaServices.getStudentResumes);
    studentRouter.route(PUT_PRIMARY_RESUME).put(checkAuth, studentKafkaServices.updatePrimaryResume);
    studentRouter.route(DELETE_STUDENT_RESUME).delete(checkAuth, studentKafkaServices.deleteStudentResume);
    studentRouter.route(GET_COUNT_RATINGS).get(checkAuth, studentKafkaServices.getRatingsCount);
    studentRouter.route(GET_PHOTOS_UPLOADED).get(checkAuth, studentKafkaServices.getPhotosUploaded);
}
else {
    studentRouter.route(POST_STUDENT_SIGNUP).post(checkAuth, studentServices.createStudentProfile);
    studentRouter.route(GET_STUDENT_SIGNUP).get(checkAuth, studentServices.getSudentDetails);
    studentRouter.route(PUT_STUDENT_SIGNUP).put(checkAuth, studentServices.updateStudentDetails);
    studentRouter.route(PUT_STUDENT_DEMOGRAPHICS).put(checkAuth, studentServices.updateStudentDemographics);
    studentRouter.route(PUT_STUDENT_JOBPREFERENCE).put(checkAuth, studentServices.updateStudentJobPreferences);
    studentRouter.route(POST_RESUME_UPLOAD).post(checkAuth, studentServices.updateStudentResume);
    studentRouter.route(GET_STUDENT_RESUMES).get(checkAuth, studentServices.getStudentResumes);
    studentRouter.route(PUT_PRIMARY_RESUME).put(checkAuth, studentServices.updatePrimaryResume);
    studentRouter.route(DELETE_STUDENT_RESUME).delete(checkAuth, studentServices.deleteStudentResume);
    studentRouter.route(GET_COUNT_RATINGS).get(checkAuth, studentServices.getRatingsCount);
    studentRouter.route(GET_PHOTOS_UPLOADED).get(checkAuth, studentServices.getPhotosUploaded);

}


module.exports = studentRouter;