const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    role: {
        type: String
    }
});

module.exports = mongoose.model('userroles', userSchema);