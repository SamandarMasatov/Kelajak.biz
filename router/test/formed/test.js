const express = require("express");
const router = express.Router();
const Subject = require("../../../models/test/subject");
const TEST_FORMED = require("../../../models/test/formed/tests");
const UNIT_FORMED = require("../../../models/test/formed/unit");
const FORM_FORMED = require("../../../models/test/formed/form");
const THEME_FORMED = require("../../../models/test/formed/theme");

router.post("/add", async (req, res, next) => {
   
  const result = new TEST_FORMED({
    subject_ID: req.body.subject_ID,
    unit_FORMED: req.body.unit_FORMED,
    form_FORMED: req.body.form_FORMED,
    theme_FORMED: req.body.theme_FORMED,
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
      res.redirect("/test_FORMED/create_page");
    })
    .catch((error) => {
      res.json({ data: error });
    });
});
router.get("/all", async (req, res, next) => {
  const result = await TEST_FORMED.find()
  .populate({path: "subject_ID", select: "name"})
  .populate({path: "unit_FORMED", select: "name"})
  .populate({path: "form_FORMED", select: "name"})
  .populate({path: "theme_FORMED", select: "name"})
  .sort({ date: -1 });
  const user = req.session.user;
  res.render("./FREE_test/formed/test/test_all", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
});
router.get("/create_page", async (req, res, next) => {
  const subject = await Subject.find().sort({ date: -1 });
  const user = req.session.user;
  res.render("./FREE_test/formed/test/test_add", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    subject,
  });
});
router.get("/all", async (req, res, next) => {
  await TEST_FORMED.findByIdAndDelete({ _id: req.params.id });
  res.redirect("/test_FORMED/create_page");
});
router.get('/:id', async (req, res, next) => {
  const result = await TEST_FORMED.findById({_id: req.params.id})
  const user = req.session.user;
  res.render("./FREE_test/formed/test/test_update", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
})
router.delete('/:id', async (req, res, next) => {
  await TEST_FORMED.findByIdAndDelete({_id: req.params.id})
  res.redirect('/test_FORMED/all')
})
router.put('/:id', async (req, res, next) => {
  const result = await TEST_FORMED.findByIdAndUpdate({ _id: req.params.id });
  result.question = req.body.question;
  result.options.a = req.body.a;
  result.options.b = req.body.b;
  result.options.c = req.body.c;
  result.options.d = req.body.d;
  result.answer = req.body.answer;
  await result.save()
    .then(() => {
      res.redirect("/test_FORMED/all");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });

})

router.get("/filter/1/:id", async (req, res, next) => {
  const result = await UNIT_FORMED.find({ subject_ID: req.params.id });
  res.json(result);
});
router.get("/filter/2/:id", async (req, res, next) => {
  const result = await FORM_FORMED.find({ unit_ID: req.params.id });
  res.json(result);
});
router.get("/filter/3/:id", async (req, res, next) => {
  const result = await THEME_FORMED.find({ form_ID: req.params.id });
  res.json(result);
});
router.get("/filter/4/:id", async (req, res, next) => {
  const result = await TEST_FORMED.find({ theme_FORMED: req.params.id });
  res.json(result);
});

module.exports = router;
