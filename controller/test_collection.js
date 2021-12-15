const Collection = require("../models/test_collection");
const Course = require("../models/course");


exports.createOne = async (req, res, next) => {
  const result = new Collection({
    name: req.body.name,
    course_ID: req.body.course_ID,
    section_ID: req.body.section_ID,
  });
  result.save()
    .then(() => {
      res.redirect("/test_collection/all");
    })
    .catch((error) => {
      res.status(400).json({ success: true, data: error });
    });
};

exports.getOne = async (req, res, next) => {
  const result = await Collection.findById({ _id: req.params.id });
  const user = req.session.user;
  res.render("./collection/update", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
};

exports.getAll = async (req, res, next) => {
  const result = await Collection.find()
    .sort({ date: -1 })
    .populate({ path: "course_ID", select: "title" })
    .populate({ path: "section_ID", select: "name" })
  const course = await Course.find();
  const user = req.session.user;
  res.render("./collection/index", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
    course,
  });
};

exports.updateOne = async (req, res, next) => {
  const result = await Collection.findByIdAndUpdate({ _id: req.params.id });
  result.name = req.body.name;
  result
    .save()
    .then(() => {
      res.redirect("/test_collection/all");
    })
    .catch((error) => {
      res.status(400).json({ success: true, data: error });
    });
};

exports.deleteOne = async (req, res, next) => {
  await Collection.findByIdAndDelete({ _id: req.params.id });
  res.redirect("/test_collection/all");
};
