const mongoose = require("mongoose");

const SectionSchema = mongoose.Schema({

  name: { type: String, required: true },
  course_ID: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: true,
    index: true
  },
  date: { type: Date, default: Date.now() },
  
});

module.exports = mongoose.model("Section", SectionSchema);
