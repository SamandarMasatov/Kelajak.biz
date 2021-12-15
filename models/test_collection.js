const mongoose = require("mongoose");

const Collection = mongoose.Schema({
  name: { type: String, required: true },
  course_ID: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: true,
    index: true
  },
  section_ID: {
    type: mongoose.Schema.ObjectId,
    ref: "Section",
    required: true,
    index: true
  },
  status: { type: String, enum: ['blocked', 'unblocked'], default:'blocked' },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Collection", Collection);
