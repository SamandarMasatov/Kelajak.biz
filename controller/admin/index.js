const Course = require("../../models/course");
const Subject = require("../../models/test/subject");

exports.dashboard = async (req, res, next) => {
  const user = req.session.user;
  res.render("./dashboard/index", {
    title: "Kelejak.biz",
    layout: "./layout",
    user,
  });
};
exports.login = async (req, res, next) => {
  res.render("./login/index", { title: "Kelejak.biz", layout: "./login" });
};
exports.test = async (req, res, next) => {
  const user = req.session.user;
  const course = await Course.find();
  res.render("./test/test_add", {
    title: "Kelejak.biz",
    layout: "./layout",
    user,
    course,
  });
};
exports.mavzulashgan = async (req, res, next) => {
  const subject = await Subject.find().sort({ date: -1 });
  const user = req.session.user;
  res.render("./FREE_test/themed/index", {
    title: "Kelejak.biz",
    layout: "./layout",
    user,
    subject,
  });
};
exports.variantlashgan = async (req, res, next) => {
  const subject = await Subject.find().sort({ date: -1 });
  const user = req.session.user;
  res.render("./FREE_test/varianted/index", {
    title: "Kelejak.biz",
    layout: "./layout",
    user,
    subject,
  });
};
exports.bloklashgan = async (req, res, next) => {
  const subject = await Subject.find().sort({ date: -1 });
  const user = req.session.user;
  res.render("./FREE_test/block/index", {
    title: "Kelejak.biz",
    layout: "./layout",
    user,
    subject,
  });
};
exports.sinflashgan = async (req, res, next) => {
  const subject = await Subject.find().sort({ date: -1 });
  const user = req.session.user;
  res.render("./FREE_test/formed/index", {
    title: "Kelejak.biz",
    layout: "./layout",
    user,
    subject
  });
};


// Arizalar boyicha ishlash
exports.universitet = async (req, res, next) => {
  const user = req.session.user;
  res.render("./ariza/universitet", {
    title: "Kelejak.biz",
    layout: "./layout",
    user,
  });
};
exports.yonalish = async (req, res, next) => {
  const user = req.session.user;
  res.render("./ariza/yonalish", {
    title: "Kelejak.biz",
    layout: "./layout",
    user,
  });
};
exports.ariza = async (req, res, next) => {
  const user = req.session.user;
  res.render("./ariza/ariza", {
    title: "Kelejak.biz",
    layout: "./layout",
    user,
  });
};
exports.davlat = async (req, res, next) => {
  const user = req.session.user;
  res.render("./ariza/davlat", {
    title: "Kelejak.biz",
    layout: "./layout",
    user,
  });
};
exports.video = async (req, res, next) => {
  const user = req.session.user;
  res.render("./ariza/video", {
    title: "Kelejak.biz",
    layout: "./layout",
    user,
  });
};


exports.profile = async (req, res, next) => {
  const user = req.session.user;
  res.render("./profile/index", {
    title: "Kelejak.biz",
    layout: "./layout",
    user,
  });
};