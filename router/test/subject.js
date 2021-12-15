const express = require("express");
const router = express.Router();
const Subject = require("../../models/test/subject");

router.post("/add", async (req, res, next) => {
  const result = new Subject({ name: req.body.name });
  result.save();
  res.redirect('/subject_FREE/all')
});
router.get("/all", async (req, res, next) => {
  const result = await Subject.find().sort({ date: -1 });
  const user = req.session.user;
  res.render("./FREE_test/subject/index", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
});
router.delete("/:id", async (req, res, next) => {
  await Subject.findByIdAndDelete({ _id: req.params.id });
  res.redirect('/subject_FREE/all')
});

module.exports = router;
