
const mongoose = require("mongoose");

const LoginCredentials = new mongoose.Schema({
    email_id: {
        type: String,
        required: true,
        unique: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_type: {
        type: Number,
        enum: [1, 2],
        required: true
    },

}, { versionKey: false })

module.exports = mongoose.model('login_credentials', LoginCredentials)
