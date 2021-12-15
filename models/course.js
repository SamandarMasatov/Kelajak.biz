const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  category_ID: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
    index: true
},
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  author_name: { type: String, required: true },
  rating: { type: Number, default: 0 },
  moreSeenCourse: { type: Number, default: 0 },
  moreSoldCourse: { type: Number, default: 0 },
  prev_payment:  { type: Number},
  chegirma:  { type: Number},
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Course", CourseSchema);
