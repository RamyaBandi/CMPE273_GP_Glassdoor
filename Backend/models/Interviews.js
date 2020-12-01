const mongoose = require("mongoose");
const Interviews = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    overallExperience: {
        type: Number,
        enum: [-1, 0, 1],
        required: true,
        default: 0
    },
    jobTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Average", "Difficult"],
    },
    offerStatus: {
        type: String,
        enum: ["Rejected", "Accepted"],
    },
    qna: {
        type: String,
    },
}, { versionKey: false })

module.exports = mongoose.model('Interviews', Interviews)
