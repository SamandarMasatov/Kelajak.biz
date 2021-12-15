const mongoose = require('mongoose');
const themes_OF_unit_THEMED = mongoose.Schema({
    name: {
        type: String, required: true // mavzu nomi
    },
    subject_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "subject_FREE",
        required: true
    },
    unit_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "unit_THEMED",
        required: true
    },
    date: {
        type: Date, default: Date.now()
    }
})

module.exports = mongoose.model("themes_THEMED", themes_OF_unit_THEMED)