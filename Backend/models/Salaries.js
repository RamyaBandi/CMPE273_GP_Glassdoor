
const mongoose = require("mongoose");
const Salaries = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    baseSalary: {
        type: Number,
        required: true
    },
    bonuses: {
        type: Number,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    employerName: {
        type: String,
        required: true
    },

}, { versionKey: false })

module.exports = mongoose.model('Salaries', Salaries)
