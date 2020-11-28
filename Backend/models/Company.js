const mongoose = require("mongoose");

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
    },
    overallRating: {
        type: Number,
    },
    recommendedRating: {
        type: Number,
    },
    revenue: {
        type: Number,
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs'
    }],
    photos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photos'
    }],
    salaries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salaries'
    }],
    interviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interviews'
    }],

}, { versionKey: false })

module.exports = mongoose.model('Company', Company)
