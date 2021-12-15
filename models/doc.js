const mongoose = require("mongoose");

const Doc = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  pdf: { type: String, required: true },
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
    index:true
  },
  status: { type: String, enum: ['blocked', 'unblocked'], default:'blocked' },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Document", Doc);
