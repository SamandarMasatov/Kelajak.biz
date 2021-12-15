const mongoose = require('mongoose');
const unit_BLOCKED = mongoose.Schema({
    name: {
        type: String, required: true
    },
    subject_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "subject_FREE",
        required: true
    },
    date: {
        type: Date, default: Date.now()
    }
})

module.exports = mongoose.model("unit_BLOCKED", unit_BLOCKED)