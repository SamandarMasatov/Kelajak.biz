const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  result: { type: Number, required: true },
  totalQuestion: { type: Number, required: true },
  user_ID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  //   =============================    Pullik test uchun     =====================================
  course_ID: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    index: true
  },
  theme_ID: {
    type: mongoose.Schema.ObjectId,
    ref: "Section",
    index: true
  },
  collection_ID: {
    type: mongoose.Schema.ObjectId,
    ref: "Collection",
    index: true
  },
  //   =============================   B e p u l    t e s t l a r    u c h u n      =====================================
  subject_ID: {
    type: mongoose.Schema.ObjectId,
    ref: "subject_FREE",
    index: true
  },
  // ----------------------   mavzulashtirilgan testlar ------------------------
  unit_ID_THEMED: {
    type: mongoose.Schema.ObjectId,
    ref: "unit_THEMED",
    index: true
  },
  theme_ID_THEMED: {
    type: mongoose.Schema.ObjectId,
    ref: "themes_THEMED",
    index: true
  },
  // ----------------------   variantlashtirilgan  testlar ------------------------
  unit_ID_VARIANTED: {
    type: mongoose.Schema.ObjectId,
    ref: "unit_VARIANTED",
    index: true
  },
  variant_ID_VARIANTED: {
    type: mongoose.Schema.ObjectId,
    ref: "variant_VARIANTED",
    index: true,
  },
  // ----------------------   sinflashtirilgan testlar   ------------------------
  unit_ID_FORMED: {
    type: mongoose.Schema.ObjectId,
    ref: "unit_FORMED",
    index: true
  },
  form_ID_FORMED: {
    type: mongoose.Schema.ObjectId,
    ref: "form_FORMED",
    index: true
  },
  theme_ID_FORMED: {
    type: mongoose.Schema.ObjectId,
    ref: "theme_FORMED",
    index: true
  },
  // ----------------------   bloklashtirilgan testlar ------------------------
  unit_ID_BLOCKED: {
    type: mongoose.Schema.ObjectId,
    ref: "unit_BLOCKED",
    index: true
  },
  variant_ID_BLOCKED: {
    type: mongoose.Schema.ObjectId,
    ref: "variant_BLOCKED",
    index: true
  },
  date: { type: Date, default: Date.now() },
});



module.exports = mongoose.model("Result", resultSchema);