// CHEGIRMA uchun sxema

const mongoose = require('mongoose');

const Chegirma = mongoose.Schema({
    course_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
        required: true, 
        index: true
    },
    amount: {
        type: Number, required: true
    },
    // startDate: {
    //     type: String, required: true
    // },
    // endDate: {
    //     type: String, required: true
    // },
    date: {
        type: Date,default: Date.now()
    }
})
module.exports = mongoose.model('Chegirma', Chegirma );