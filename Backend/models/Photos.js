const mongoose = require("mongoose");
const Photos = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    photoURL: {
        type: String,
        required: true,
    },
    approvalStatus: {
        type: String,
        enum: ['Accepted', 'Rejected', 'Under Review'],
        default: 'Under Review'
    },
    uploadDate: {
        type: Date,
        required: true
    },
    fileName: {
        type: String,
    },

}, { versionKey: false })

module.exports = mongoose.model('Photos', Photos)
