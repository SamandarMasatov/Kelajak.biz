const mongoose = require("mongoose");

const test_FREE = mongoose.Schema({
  //   =============================   Fan  =============================
  subject: {
    type: mongoose.Schema.ObjectId,
    ref: "subject_FREE",
    required: true,
  },
  //   =============================   Sinflashtirilgan  =============================
  unit_FORMED: {
    type: mongoose.Schema.ObjectId,
    ref: "unit_FORMED",
  },
  form_FORMED: {
    type: mongoose.Schema.ObjectId,
    ref: "form_OF_unit_FORMED",
  },
  theme_FORMED: {
    type: mongoose.Schema.ObjectId,
    ref: "themes_OF_form",
  },
  //   =============================   Mavzulashtirilgan  =============================
  unit_THEMED: {
    type: mongoose.Schema.ObjectId,
    ref: "unit_THEMED",
  },
  theme_THEMED: {
    type: mongoose.Schema.ObjectId,
    ref: "themes_OF_unit_THEMED",
  },
  //   =============================   Variantlashtirilgan  =============================
  unit_VARIANTED: {
    type: mongoose.Schema.ObjectId,
    ref: "unit_VARIANTED",
  },
  variant_VARIANTED: {
    type: mongoose.Schema.ObjectId,
    ref: "variant_OF_unit_VARIANTED",
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

module.exports = mongoose.model("test_FREE", test_FREE);
