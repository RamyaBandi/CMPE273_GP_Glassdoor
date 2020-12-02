const mongoose = require("mongoose");
const Reviews = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    studentId: {
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
        default: 'Under Review'
    },
    helpfulCount: {
        type: Number,
        default: 0,
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
    reviewDate : {
        type : Date, 
        default: Date.now
    }, 
    reply: {
        type: String,
    },
    replyTimeStamp: {
        type: Date,
    },
}, { versionKey: false })

module.exports = mongoose.model('Reviews', Reviews)
