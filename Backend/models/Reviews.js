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
    approvalstatus: {
        type: String,
        enum: ['Accpeted', 'Rejected'],
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
<<<<<<< HEAD
    }
}, { versionKey: false })
=======
    },
    reply:{
        type: String,
    },
    replytimestamp:{
        type: Date,
    },
    }, { versionKey: false })
>>>>>>> 98360e5c4e91839e06b8bca889aad793bcc7ba6b

module.exports = mongoose.model('Reviews', Reviews)
