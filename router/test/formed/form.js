const express = require('express');
const router = express.Router();
const FORM = require('../../../models/test/formed/form');
const Subject = require('../../../models/test/subject');

router.post('/add', async( req, res, next) => {
    const result = new FORM({ 
        name:  req.body.name,
        subject_ID:  req.body.subject_ID,
        unit_ID:  req.body.unit_ID,
    })
    result.save()
    res.redirect('/formed_FORM/all')
});
router.get('/all', async( req, res, next) => {
    const user = req.session.user;
    const result = await FORM.find()
    .populate({path: "subject_ID", select: "name"})
    .populate({path: "unit_ID", select: "name"})
    .sort({ date: -1 })
    const subject = await Subject.find().sort({ date: -1 })
    res.render("./FREE_test/formed/form", {
        title: "Kelejak.uz",
        layout: "./layout",
        user,
        result,
        subject
      });
});
router.delete('/:id', async( req, res, next) => {
    await FORM.findByIdAndDelete({_id: req.params.id})
    res.redirect('/formed_FORM/all')
});

router.get('/filter/:id',async( req, res, next) => {
    const result = await FORM.find({unit_ID: req.params.id})
    res.json(result)
  })


module.exports = router;