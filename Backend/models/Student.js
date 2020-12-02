const mongoose = require("mongoose");

const Student_schema = new mongoose.Schema({
    // studentId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
  
    // },
    studentName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    interestedJobtitle: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    website:{
        type: String,
    },
    location: {
        type: String,
    },
    degree:{
        type: String,
    },
    education:{
        type: String,
    },
    experience: {
        type: String,
    },
    yearsOfExperience:{
        type: String,
    },
    aboutMe:{
        type: String,
    },
    accpetedReviewCount: {
        type: Number,
    },
    primaryResume: {
        type: mongoose.Schema.Types.ObjectId
    },
    photos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photos'
    }],
    resumes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume'
    }],
    resumeNames:[{
        type: String,
    }],
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }],
    favoriteJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs'
    }],
    companyReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    }],
    salaryReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salaries'
    }],
    interviewReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interviews'
    }],
    jobSearchStatus: {
        type: String,
        enum: ['Not Looking', 'Casually Looking', 'Actively Looking'],
    },
    jobTitle:{
    type: String,
    },
    targetedSalary: {
        type: Number,
    },
    relocationPreference: {
        type: String,
        enum: ['yes', 'no']
    },
    industryPreference: {
        type: String,
    },
    race: {
        type: String,
    },
    gender: {
        type: String,
    },
    disability: {
        type: String,
    },
    veteranStatus: {
        type: String,
    },
    salaries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salaries'
    }],
    interviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interviews'
    }],
}, { versionKey: false })

module.exports = mongoose.model('Student', Student_schema)
