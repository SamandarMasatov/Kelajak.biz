const express = require("express");
const router = express.Router();
const Subject = require("../../../models/test/subject");
const UNIT_BLOCKED = require("../../../models/test/block/unit");
const VARIANT_BLOCKED = require("../../../models/test/block/variant");
const TEST_BLOCKED = require("../../../models/test/block/test");


router.post("/add", async (req, res, next) => {
  const result = new TEST_BLOCKED({
    subject_ID: req.body.subject_ID,
    unit_BLOCKED: req.body.unit_BLOCKED,
    variant_BLOCKED: req.body.variant_BLOCKED,
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
      res.redirect("");
    })
    .catch((error) => {
      res.json({ data: error });
    });
});

router.get("/all", async (req, res, next) => {
  const result = await TEST_BLOCKED.find()
  .populate({path: "subject_ID", select: "name"})
  .populate({path: "unit_BLOCKED", select: "name"})
  .populate({path: "variant_BLOCKED", select: "name"})
  .sort({ date: -1 });
  const user = req.session.user;
  res.render("./FREE_test/block/test/test_all", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
});
router.get("/create_page", async (req, res, next) => {
  const subject = await Subject.find().sort({ date: -1 });
  const user = req.session.user;
  res.render("./FREE_test/block/test/test_add", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    subject,
  });
});
router.get("/all", async (req, res, next) => {
  await TEST_BLOCKED.findByIdAndDelete({ _id: req.params.id });
  res.redirect("/test_BLOKED/all");
});
router.get('/:id', async (req, res, next) => {
  const result = await TEST_BLOCKED.findById({_id: req.params.id})
  const user = req.session.user;
  res.render("./FREE_test/block/test/test_update", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
})
router.delete('/:id', async (req, res, next) => {
  await TEST_BLOCKED.findByIdAndDelete({_id: req.params.id})
  res.redirect('/test_BLOKED/all')
})
router.put('/:id', async (req, res, next) => {
  const result = await TEST_BLOCKED.findByIdAndUpdate({ _id: req.params.id });
  result.question = req.body.question;
  result.options.a = req.body.a;
  result.options.b = req.body.b;
  result.options.c = req.body.c;
  result.options.d = req.body.d;
  result.answer = req.body.answer;
  await result.save()
    .then(() => {
      res.redirect("/test_BLOKED/all");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
})

// Fanning id si boyicha hamma unit lani olish
router.get("/filter/1/:id", async (req, res, next) => {
  const result = await UNIT_BLOCKED.find({ subject_ID: req.params.id });
  res.json(result);
});
// Bolimning id si bouicha hamma variantlarni olish 
router.get("/filter/2/:id", async (req, res, next) => {
  const result = await VARIANT_BLOCKED.find({ unit_ID: req.params.id });
  res.json(result);
});
router.get("/filter/3/:id", async (req, res, next) => {
  const result = await TEST_BLOCKED.find({ variant_VARIANTED: req.params.id });
  res.json(result);
});
module.exports = router;
