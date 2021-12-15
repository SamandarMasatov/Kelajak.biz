const mongoose = require('mongoose');
const form_OF_unit_FORMED = mongoose.Schema({
    name: {
        type: String, required: true
    },
    subject_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "subject_FREE",
        required: true
    },
    unit_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "unit_FORMED",
        required: true
    },
    date: {
        type: Date, default: Date.now()
    }
})

module.exports = mongoose.model("form_FORMED", form_OF_unit_FORMED)