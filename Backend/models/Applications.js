const mongoose = require("mongoose");
const Applications = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    appliedDate: {
        type: Date,
        required: true
    },

    applicationstatus: {
        type: String,
        enum: ['Applied', 'Selected', 'Rejected', 'Withdrawn']
    },
    status: {
        type: String,
        enum: ["Submitted", "Reviewed", "Initial Screening", "Interviewing", "Hired", "Withdrawn", "Rejected"],
        default: "Submitted"
    },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resumes',
    },
    resumeUrl: {
        type: String
    },
    coverLetterUrl:{
        type:String
    }
}, { versionKey: false })

module.exports = mongoose.model('Applications', Applications);