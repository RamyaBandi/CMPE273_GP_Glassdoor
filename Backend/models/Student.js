const mongoose = require("mongoose");

const Student_schema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
  
    },
    studentName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,   
    },
    primaryResume:{
        type: mongoose.Schema.Types.ObjectId
    },
    photos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photos' 
    }],
    resumes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume'   
    }],
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'   
    }],
    favoriteJobs:[{
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
    jobSearchStatus:{
        type: String,
        enum:['Not Looking','Casually Looking','Actively Looking'],
    },
    targetedSalary:{
        type: Number,
    },
    relocationPreference:{
        type: String,
        enum:['yes','no']
    },
    industryPreference:{
        type: String,
    },
    race:{
        type: String,
    },
    gender:{
        type: String,
    },
    disability:{
        type: String,
    },
    veteranStatus:{
        type: String,
    }
}, { versionKey: false })

module.exports = mongoose.model('Student', Student_schema)
