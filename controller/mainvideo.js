const Videos = require('../models/mainvideo');
const fs = require('fs');
const path = require('path');

exports.createOne = async (req, res) => {
  const result = new Videos({
    video: req.body.video
  })
  await result.save()
    .then(() => { res.redirect('/mainvideo/all') })
    .catch((error) => { res.status(400).json({ data: error }) })
};



exports.getAll = async (req, res, next) => {
  const result = await Videos.find()
    .sort({ date: -1 })
  if (!result) {
    res.status(400).json({ data: 'Xatolik' })
  } else {
    res.render("./mainvideo/boshqa", {
      title: "Kelejak.uz",
      layout: "./layout",
      result,
    })
  }
};

exports.deleteOne = async (req, res, next) => {
  await Videos.findById({ _id: req.params.id }).exec(async (error, data) => {
    if (error) {
      res.send(error);
    } else {
      const filePath = path.join(
        __dirname,
        "../public/uploads/video " + data.video
      );
      fs.unlink(filePath, async (err) => {
        if (err) throw err;
        await Videos.findByIdAndDelete({ _id: req.params.id });
        res.redirect("/mainvideo/all");
      });
    }
  });
};


