const Audio = require("../models/audio");
const Course = require("../models/course");
const path = require("path");
const fs = require("fs");

exports.createOne = async (req, res, next) => {
  const result = new Audio({
    title: req.body.title,
    description: req.body.description,
    audio: `${req.file.filename}`,
    audio_time: req.body.audio_time,
    tag: req.body.tag,
    course_ID: req.body.course_ID,
    section_ID: req.body.section_ID,
  });
  result
    .save()
    .then(() => {
      res.redirect("/audio/all");
    })
    .catch((error) => {
      res.status(400).json({ success: true, data: error });
    });
};

exports.getAll = async (req, res, next) => {
  const result = await Audio.find()
    .sort({ date: -1 })
    .populate({ path: "course_ID", select: ["title", "author_name"] })
    .populate({ path: "section_ID", select: "name" });
  const course = await Course.find();
  const user = req.session.user;
  res.render("./audio/index", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
    course,
  });
  
};

exports.getOne = async (req, res, next) => {
  const result = await Audio.findById({ _id: req.params.id });
  const user = req.session.user;
  res.render("./audio/update", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
};

exports.getInfo = async (req, res, next) => {
  const result = await Audio.findById({ _id: req.params.id })
  .populate({
      path: "course_ID", select: "title"
  })
  .populate({
      path: "section_ID", select: "name"
  })
  const user = req.session.user;
  res.render("./audio/info", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
};

exports.updateInfo = async (req, res, next) => {
  const result = await Audio.findByIdAndUpdate({ _id: req.params.id });
  result.title = req.body.title;
  result.description = req.body.description;
  result.audio_time = req.body.audio_time;
  result.tag = req.body.tag;
  await result
    .save()
    .then(() => {
      res.redirect("/audio/all");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.updateAudio = async (req, res, next) => {
  await Audio.findById({ _id: req.params.id }).exec((error, data) => {
    if (error) {
      res.srnd(error);
    } else {
      const filePath = path.join(
        __dirname,
        "../public/uploads/video/" + data.audio
      );
      fs.unlink(filePath, async (err) => {
        if (err) throw err;
      });
    }
  });
  const result = await Audio.findByIdAndUpdate({ _id: req.params.id });
  result.audio = `${req.file.filename}`;
  await result
    .save()
    .then(() => {
      res.redirect("/audio/all");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.deleteOne = async (req, res, next) => {
  await Audio.findById({ _id: req.params.id }).exec(async (error, data) => {
    if (error) {
      res.send(error);
    } else {
      const filePath = path.join(
        __dirname,
        "../public/uploads/video/" + data.audio
      ); 
      fs.unlink(filePath, async (err) => {
        if (err) throw err;
        await Audio.findByIdAndDelete({ _id: req.params.id });
        res.redirect("/audio/all");
      });
    }
  });
};
