const mongoose = require('mongoose');
const subject_FREE = mongoose.Schema({
    name: {
        type: String, required: true
    },
    date: {
        type: Date, default: Date.now()
    }
})

module.exports = mongoose.model("subject_FREE", subject_FREE)