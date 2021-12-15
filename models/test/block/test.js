const mongoose = require("mongoose");

const TEST = mongoose.Schema({
  //   =============================   Fan  =============================
  subject_ID: {
    type: mongoose.Schema.ObjectId,
    ref: "subject_FREE",
    required: true,
  },
  //   =============================   Variantlashtirilgan  =============================
  unit_BLOCKED: {
    type: mongoose.Schema.ObjectId,
    ref: "unit_BLOCKED",
  },
  variant_BLOCKED: {
    type: mongoose.Schema.ObjectId,
    ref: "variant_BLOCKED",
  },
  //   =============================   Test  =============================
  question: {
    type: String,
    required: true,
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

module.exports = mongoose.model("test_BLOCKED", TEST);
