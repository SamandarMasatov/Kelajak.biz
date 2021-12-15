

const mongoose = require("mongoose");

const VideoSchema = mongoose.Schema({
  title: { type: String, required: true },
  video: { type: String, required: true },
  description: { type: String, required: true },
  video_time: { type: String, required: true },
  tag: [{ type: String, required: true }],
  rating: { type: Number, default: 0 },
  counter: { type: Number,default: 0 },
  status: { type: String, enum: ['blocked', 'unblocked'], default:'blocked'  },
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
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Video", VideoSchema);
