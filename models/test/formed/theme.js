const mongoose = require('mongoose');
const themes_OF_form = mongoose.Schema({
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
    form_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "form_FORMED",
        required: true
    },
    date: {
        type: Date, default: Date.now()
    }
})

module.exports = mongoose.model("theme_FORMED", themes_OF_form)