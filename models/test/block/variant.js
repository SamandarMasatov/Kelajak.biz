const mongoose = require('mongoose');
const variant_OF_unit_BLOCKED = mongoose.Schema({
    name: {
        type: String, required: true // variantlar berialdi
    },
    subject_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "subject_FREE",
        required: true
    },
    unit_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "unit_BLOCKED",
        required: true
    },
    date: {
        type: Date, default: Date.now()
    }
})

module.exports = mongoose.model("variant_BLOCKED", variant_OF_unit_BLOCKED)