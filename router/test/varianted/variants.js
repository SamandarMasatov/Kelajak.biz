const express = require("express");
const router = express.Router();
const VARIANT = require("../../../models/test/varianted/variants");
const Subject = require("../../../models/test/subject");

router.post("/add", async (req, res, next) => {
  const result = new VARIANT({
    name: req.body.name,
    subject_ID: req.body.subject_ID,
    unit_ID: req.body.unit_ID,
  });
  result.save();
  res.redirect('/varianted_VARIANT/all')
});
router.get("/all", async (req, res, next) => {
  const user = req.session.user;
  const result = await VARIANT.find()
    .populate({ path: "subject_ID", select: "name" })
    .populate({ path: "unit_ID", select: "name" })
    .sort({ date: -1 });
  const subject = await Subject.find().sort({ date: -1 });
  res.render("./FREE_test/varianted/variant", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
    subject,
  });
});
router.delete("/:id", async (req, res, next) => {
  await VARIANT.findByIdAndDelete({ _id: req.params.id });
  res.redirect('/varianted_VARIANT/all')
});

module.exports = router;
