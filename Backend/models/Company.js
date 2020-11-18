const mongoose = require("mongoose");
const Reviews = require('Reviews')
const Company = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String,
    },
    companySize: {
        type: Number,
    },
    companyType: {
        type: String,
    },
    revenue: {
        type: Number,
    },
    headquarters: {
        type: String,
    },
    industry: {
        type: String,
    },
    founded: {
        type: Date,
    },
    mission: {
        type: String,
    },
    description: {
        type: String,
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
