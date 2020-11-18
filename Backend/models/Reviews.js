const mongoose = require("mongoose");
const Reviews = new mongoose.Schema({
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    headline: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    pros: {
        type: String,
        required: true
    },
    cons: {
        type: String,
        required: true
    },
    approvalstatus: {
        type: String,
        enum: ['Accepted', 'Rejected', 'Under Review'],
    },
    helpfulCount: {
        type: Number,
        required: true
    },
    overallRating: {
        type: Number,
        required: true
    },
    recommendedRating: {
        type: Number,
        required: true
    },
    ceoRating: {
        type: Number,
        required: true
    },
    reply: {
        type: String,
    },
    replyTimeStamp: {
        type: Date,
    },
}, { versionKey: false })

module.exports = mongoose.model('Reviews', Reviews)
