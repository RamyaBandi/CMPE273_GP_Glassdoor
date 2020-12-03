const mongoose = require("mongoose");
const InterviewQnA = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
}, { versionKey: false })

module.exports = mongoose.model('InterviewQnA', InterviewQnA)
