
const mongoose = require("mongoose");
const Salaries = new mongoose.Schema({
    jobTitle: {
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
        type: Number,
        required: true
    },

}, { versionKey: false })

module.exports = mongoose.model('Salaries', Salaries)
