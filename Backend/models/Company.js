const mongoose = require("mongoose");
const Reviews = require('Reviews')
const Company = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    companySize: {
        type: Number,
        required: true,
    },
    companyType: {
        type: String,
        required: true
    },
    revenue: {
        type: Number,
        required: true
    },
    headquarters: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    founded: {
        type: Date,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ceoName: {
        type: String,
        required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    }],
    proReview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    },
    consReview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    },
    featuredReview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    },
    averageRating: {
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
    revenue: {
        type: Number,
        required: true
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs'
    }],
    photos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photos'
    }],

}, { versionKey: false })

module.exports = mongoose.model('Company', Company)
