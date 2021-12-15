const express = require("express");
const router = express.Router();
const Subject = require("../../../models/test/subject");
const TEST_THEMED = require("../../../models/test/themed/tests");
const UNIT_THEMED = require("../../../models/test/themed/unit");
const THEME_THEMED = require("../../../models/test/themed/themes");
const Category = require('../../../models/category')


router.post("/add", async (req, res, next) => {
  const result = new TEST_THEMED({
    subject_ID: req.body.subject_ID,
    unit_THEMED: req.body.unit_THEMED,
    theme_THEMED: req.body.theme_THEMED,
    question: req.body.question,
    options: {
      a: req.body.a,
      b: req.body.b,
      c: req.body.c,
      d: req.body.d,
    },
    answer: req.body.answer,
    // times: req.body.times,
    // test_duration: req.body.test_duration,
  });
  result
    .save()
    .then(() => {
      res.redirect("/test_THEMED/create_page");
    })
    .catch((error) => {
      res.json({ data: error });
    });
});

router.get("/all", async (req, res, next) => {
  const result = await TEST_THEMED.find()
    .populate({ path: "subject_ID", select: "name" })
    .populate({ path: "unit_THEMED", select: "name" })
    .populate({ path: "theme_THEMED", select: "name" })
    .sort({ date: -1 });
  const user = req.session.user;
  res.render("./FREE_test/themed/test/test_all", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
});
router.get("/create_page", async (req, res, next) => {
  const subject = await Subject.find().sort({ date: -1 });
  const user = req.session.user;
  res.render("./FREE_test/themed/test/test_add", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    subject,
  });
});
router.get("/all", async (req, res, next) => {
  await TEST_THEMED.findByIdAndDelete({ _id: req.params.id });
  res.redirect("/test_THEMED/create_page");
});
router.get("/:id", async (req, res, next) => {
  const result = await TEST_THEMED.findById({ _id: req.params.id });
  const user = req.session.user;
  res.render("./FREE_test/themed/test/test_update", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
});
router.delete("/:id", async (req, res, next) => {
  await TEST_THEMED.findByIdAndDelete({ _id: req.params.id });
  res.redirect("/test_THEMED/all");
});
router.put("/:id", async (req, res, next) => {
  const result = await TEST_THEMED.findByIdAndUpdate({ _id: req.params.id });
  result.question = req.body.question;
  result.options.a = req.body.a;
  result.options.b = req.body.b;
  result.options.c = req.body.c;
  result.options.d = req.body.d;
  result.answer = req.body.answer;
  await result
    .save()
    .then(() => {
      res.redirect("/test_THEMED/all");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
});
// Fanning id si boyicha hamma unit lani olish
router.get("/filter/1/:id", async (req, res, next) => {
  const result = await UNIT_THEMED.find({ subject_ID: req.params.id });
  res.json(result);
});
// Bolimning id si bouicha hamma mavzularni olish
router.get("/filter/2/:id", async (req, res, next) => {
  const result = await THEME_THEMED.find({ unit_ID: req.params.id });
  res.json(result);
});
//  web site qismdan mavzuning id si boyicha hamma testlarni olish
router.get("/filter/test/:id", async (req, res, next) => {
  const user = req.session.client;
  const category = await Category.find();
  const result = await TEST_THEMED.find({ theme_THEMED: req.params.id });
  // res.render("./WEBSITE/FREE_test/themed/solution", {
  //   title: "Kelejak.uz",
  //   layout: "./layout",
  //   user,
  //   category,
  //   result,
  // });
  res.json(result)
});

module.exports = router;
