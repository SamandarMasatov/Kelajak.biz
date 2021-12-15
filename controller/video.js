const Video = require("../models/video");
const Course = require("../models/course");
const path = require("path");
const fs = require("fs");


exports.createOne = async (req, res, next) => {
  const result = new Video({
    title: req.body.title,
    description: req.body.description,
    video: `${req.file.filename}`,
    video_time: req.body.video_time,
    tag: req.body.tag,
    course_ID: req.body.course_ID,
    section_ID: req.body.section_ID,
  });
  result
    .save()
    .then(() => {
      res.redirect("/video/all");
    })
    .catch((error) => {
      res.status(400).json({ success: true, data: error });
    });
};

exports.getAll = async (req, res, next) => {
  const result = await Video.find()
    .sort({ date: -1 })
    .populate({ path: "course_ID", select: ["title", "author_name"] })
    .populate({ path: "section_ID", select: "name" });
  const course = await Course.find();
  const user = req.session.user;
  res.render("./video/index", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
    course,
  });
  
};

exports.getOne = async (req, res, next) => {
  const result = await Video.findById({ _id: req.params.id });
  const user = req.session.user;
  res.render("./video/update", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
};

exports.getInfo = async (req, res, next) => {
  const result = await Video.findById({ _id: req.params.id })
  .populate({
      path: "course_ID", select: "title"
  })
  .populate({
      path: "section_ID", select: "name"
  })
  const user = req.session.user;
  res.render("./video/info", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
};

exports.updateInfo = async (req, res, next) => {
  const result = await Video.findByIdAndUpdate({ _id: req.params.id });
  result.title = req.body.title;
  result.description = req.body.description;
  result.video_time = req.body.video_time;
  result.tag = req.body.tag;
  await result
    .save()
    .then(() => {
      res.redirect("/video/all");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.updateVideo = async (req, res, next) => {
  await Video.findById({ _id: req.params.id }).exec((error, data) => {
    if (error) {
      res.srnd(error);
    } else {
      const filePath = path.join(
        __dirname,
        "../public/uploads/video/" + data.video
      );
      fs.unlink(filePath, async (err) => {
        if (err) throw err;
      });
    }
  });
  const result = await Video.findByIdAndUpdate({ _id: req.params.id });
  result.video = `${req.file.filename}`;
  await result
    .save()
    .then(() => {
      res.redirect("/video/all");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.deleteOne = async (req, res, next) => {
  await Video.findById({ _id: req.params.id }).exec(async (error, data) => {
    if (error) {
      res.send(error);
    } else {
      const filePath = path.join(
        __dirname,
        "../public/uploads/video/" + data.video
      ); 
      fs.unlink(filePath, async (err) => {
        if (err) throw err;
        await Video.findByIdAndDelete({ _id: req.params.id });
        res.redirect("/video/all");
      });
    }
  });
};
