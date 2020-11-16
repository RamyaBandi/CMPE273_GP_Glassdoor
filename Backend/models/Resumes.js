const mongoose = require("mongoose");
const Resumes = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    uploadDate: {
        type: Date,
        required: true,
    },
    uploadLink: {
        type: String,
        required: true
    },

}, { versionKey: false })

module.exports = mongoose.model('Resumes', Resumes)
