const mongoose = require('mongoose');

const addCourseSchema = mongoose.Schema({
    course_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
        required: true,
        index: true
    },
    user_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    date: { type: Date, default: Date.now() }
});


module.exports = mongoose.model("addCourse", addCourseSchema);