const express = require("express");
const router = express.Router();
const Subject = require("../../../models/test/subject");
const UNIT_VARIANTED = require("../../../models/test/varianted/unit");
const VARIANT_VARIANTED = require("../../../models/test/varianted/variants");
const TEST_VARIANTED = require("../../../models/test/varianted/test");
router.post("/add", async (req, res, next) => {
  const result = new TEST_VARIANTED({
    subject_ID: req.body.subject_ID,
    unit_VARIANTED: req.body.unit_VARIANTED,
    variant_VARIANTED: req.body.variant_VARIANTED,
    question: req.body.question,
    options: {
      a: req.body.a,
      b: req.body.b,
      c: req.body.c,
      d: req.body.d,
    },
    answer: req.body.answer,
  });
  result
    .save()
    .then(() => {
      res.redirect("/test_VARIANTED/create_page");
    })
    .catch((error) => {
      res.json({ data: error });
    });
});

router.get("/all", async (req, res, next) => {
  const result = await TEST_VARIANTED.find()
  .populate({path: "subject_ID", select: "name"})
  .populate({path: "unit_VARIANTED", select: "name"})
  .populate({path: "variant_VARIANTED", select: "name"})
  .sort({ date: -1 });
  const user = req.session.user;
  res.render("./FREE_test/varianted/test/test_all", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
});
router.get("/create_page", async (req, res, next) => {
  const subject = await Subject.find().sort({ date: -1 });
  const user = req.session.user;
  res.render("./FREE_test/varianted/test/test_add", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    subject,
  });
});
router.get("/all", async (req, res, next) => {
  await TEST_VARIANTED.findByIdAndDelete({ _id: req.params.id });
  res.redirect("/test_VARIANTED/create_page");
});
router.get('/:id', async (req, res, next) => {
  const result = await TEST_VARIANTED.findById({_id: req.params.id})
  const user = req.session.user;
  res.render("./FREE_test/varianted/test/test_update", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
})
router.delete('/:id', async (req, res, next) => {
  await TEST_VARIANTED.findByIdAndDelete({_id: req.params.id})
  res.redirect('/test_VARIANTED/all')
})
router.put('/:id', async (req, res, next) => {
  const result = await TEST_VARIANTED.findByIdAndUpdate({ _id: req.params.id });
  result.question = req.body.question;
  result.options.a = req.body.a;
  result.options.b = req.body.b;
  result.options.c = req.body.c;
  result.options.d = req.body.d;
  result.answer = req.body.answer;
  await result.save()
    .then(() => {
      res.redirect("/test_VARIANTED/all");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
})

// Fanning id si boyicha hamma unit lani olish
router.get("/filter/1/:id", async (req, res, next) => {
  const result = await UNIT_VARIANTED.find({ subject_ID: req.params.id });
  res.json(result);
});
// Bolimning id si bouicha hamma variantlarni olish 
router.get("/filter/2/:id", async (req, res, next) => {
  const result = await VARIANT_VARIANTED.find({ unit_ID: req.params.id });
  res.json(result);
});
router.get("/filter/3/:id", async (req, res, next) => {
  const result = await TEST_VARIANTED.find({ variant_VARIANTED: req.params.id });
  res.json(result);
});
module.exports = router;
