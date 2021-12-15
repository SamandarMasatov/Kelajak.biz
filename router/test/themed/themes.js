const express = require('express');
const router = express.Router();
const THEME = require('../../../models/test/themed/themes');
const Subject = require("../../../models/test/subject");


router.post('/add', async( req, res, next) => {
    const result = new THEME({ 
        name:  req.body.name,
        subject_ID:  req.body.subject_ID, // fanlar
        unit_ID:  req.body.unit_ID, // mavzulashtirilgan
    })
    result.save()
    res.redirect('/themed_THEME/all')
});
router.get('/all', async( req, res, next) => {
    const user = req.session.user;
    const result = await THEME.find()
    .populate({path: "subject_ID", select: "name"})
    .populate({path: "unit_ID", select: "name"})
    .sort({date: -1})
    const subject = await Subject.find().sort({ date: -1 })
    res.render("./FREE_test/themed/theme", { title: "Kelejak.uz", layout: "./layout",user,result,subject});
});
router.delete('/:id', async( req, res, next) => {
    await THEME.findByIdAndDelete({_id: req.params.id})
    res.redirect('/themed_THEME/all')
});


module.exports = router;       
