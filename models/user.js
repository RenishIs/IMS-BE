const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    role: {
        type: String
    },
    password: {
        type: String
    },
    technology: {
        type: Array | String
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model('users', userSchema);