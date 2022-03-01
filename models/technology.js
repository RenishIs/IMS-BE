const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String },
        skills: { type: Array },
        created_at: { type: Date, required: true, default: Date.now },
        updated_at: { type: Date },
    });

module.exports = mongoose.model('technology', technologySchema);