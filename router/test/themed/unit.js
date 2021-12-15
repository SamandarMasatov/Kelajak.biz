const express = require("express");
const router = express.Router();
const Unit = require("../../../models/test/themed/unit");
const Theme = require("../../../models/test/themed/themes");
const Subject = require("../../../models/test/subject");



router.post("/add", async (req, res, next) => {
  const result = new Unit({
    name: req.body.name,
    subject_ID: req.body.subject_ID
  });
  result.save()
  .then(() => {
    res.redirect('/themed_UNIT/all')
  })
  .catch((error) => {
    res.json(error)
  })
  
});
router.get("/all", async (req, res, next) => {
  const user = req.session.user;
  const result = await Unit.find().populate({path: "subject_ID", select: "name"}).sort({ date: -1 })
  const subject = await Subject.find().sort({ date: -1 })
  res.render("./FREE_test/themed/unit", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
    subject
  });
});
router.delete("/:id", async (req, res, next) => {
  await Unit.findByIdAndDelete({ _id: req.params.id });
  res.redirect('/themed_UNIT/all')
});


router.get('/filter/:id',async( req, res, next) => {
  const result = await Unit.find({subject_ID: req.params.id})
  res.json(result)
})
router.get('/filtered/:id',async( req, res, next) => {
  const result = await Theme.find({unit_ID: req.params.id})
  res.json(result)
})



module.exports = router;
