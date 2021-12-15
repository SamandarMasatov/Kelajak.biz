const mongoose = require("mongoose");

const TestSchema = mongoose.Schema({
    course_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
        required: true
    },
    theme_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "Section",
        required: true,
        index: true
    },
    collection_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "Collection",
        required: true,
        index: true
    },

    question: {
        type: String,
        required: true
    },
    options: {
        a: { type: String, required: true },
        b: { type: String, required: true },
        c: { type: String, required: true },
        d: { type: String, required: true },
    },

    answer: { type: String, required: true },
    score: { type: Number, default: 0 },
    status: { type: String, default: "" },
    date: {
        type: Date,
        default: Date.now(),
    },
});



module.exports = mongoose.model("Test", TestSchema);