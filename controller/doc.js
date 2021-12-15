const Documents = require("../models/doc");
const Course = require("../models/course");
const path = require("path");
const fs = require("fs");

exports.createOne = async (req, res, next) => {
  const result = new Documents({
    title: req.body.title,
    description: req.body.description,
    pdf:  `${req.file.filename}`,
    course_ID: req.body.course_ID,
    section_ID: req.body.section_ID
  }); 
  result
    .save()
    .then(() => {
      res.redirect("/document/all");
    })
    .catch((error) => {
      res.status(400).json({ success: true, data: error });
    });
};

exports.getOne = async (req, res, next) => {
  const result = await Documents.findById({ _id: req.params.id });
  const user = req.session.user;
  res.render("./document/update", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
};

exports.getAll = async (req, res, next) => {
  const result = await Documents.find()
    .sort({ date: -1 })
    .populate({ path: "course_ID", select: "title" })
    .populate({ path: "section_ID", select: "name" })
  const course = await Course.find();
  const user = req.session.user;
  res.render("./document/index", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
    course,
  });
};

exports.updateOne = async (req, res, next) => {
  await Documents.findById({ _id: req.params.id }).exec((error, data) => {
    if (error) {
      throw error
    } else {
      const filePath = path.join(
        __dirname,
        "../public/uploads/books/" + data.pdf
      );
      fs.unlink(filePath, async (err) => {
        if (err) throw err;
      });
    }
  });
  const result = await Documents.findByIdAndUpdate({ _id: req.params.id });
  result.pdf = `${req.file.filename}`
  result.title = req.body.title
  result.description =req.body.description
  result
    .save()
    .then(() => {
        res.redirect("/document/all");
    })
    .catch((error) => {
      res.status(400).json({ success: true, data: error });
    });
};

exports.deleteOne = async (req, res, next) => {
  await Documents.findById({ _id: req.params.id }).exec(async (error, data) => {
    if (error) {
      res.send(error);
    } else {
      const filePath = path.join(
        __dirname,
        "../public/uploads/books/" + data.pdf
      );
      fs.unlink(filePath, async (err) => {
        if (err) throw err;
        await Documents.findByIdAndDelete({ _id: req.params.id });
        res.redirect("/document/all");
      });
    }
  });
};
