const Section = require("../models/section");
const Course = require("../models/course");

exports.createOne = async (req, res, next) => {
  const result = new Section({
    name: req.body.name,
    course_ID: req.body.course_ID,
  });
  result
    .save()
    .then(() => {
      res.redirect("/section/all");
    })
    .catch((error) => {
      res.status(400).json({ success: true, data: error });
    });
};

exports.getOne = async (req, res, next) => {
  const result = await Section.findById({ _id: req.params.id });
  const user = req.session.user;
  res.render("./section/update", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
};

exports.getAll = async (req, res, next) => {
  const result = await Section.find()
    .sort({ date: -1 })
    .populate({ path: "course_ID", select: "title" }); 
  const course = await Course.find();
  const user = req.session.user;
  res.render("./section/index", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
    course,
  });
};

exports.updateOne = async (req, res, next) => {
  const result = await Section.findByIdAndUpdate({ _id: req.params.id });
  result.name = req.body.name;
  result
    .save()
    .then(() => {
      res.redirect("/section/all");
    })
    .catch((error) => {
      res.status(400).json({ success: true, data: error });
    });
};

exports.deleteOne = async (req, res, next) => {
  await Section.findByIdAndDelete({ _id: req.params.id });
  res.redirect("/section/all");
};
