const mongoose = require("mongoose");

const CompanyViews = new mongoose.Schema({
    companyId : {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        // default : new Date()
    }

}, { versionKey: false })

module.exports = mongoose.model('CompanyViews', CompanyViews)