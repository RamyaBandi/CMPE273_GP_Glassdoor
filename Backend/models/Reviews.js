const mongoose = require("mongoose");
const Reviews = new mongoose.Schema({
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
    }
}, { versionKey: false })

module.exports = mongoose.model('Reviews', Reviews)