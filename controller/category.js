const Category = require("../models/category");


exports.createOne = async (req, res) => {
  let result = new Category({
    name: req.body.name,
  });
  await result
    .save()
    .then(() => {
      res.redirect("/category/all");
    })
    .catch((error) => {
      res.status(400).json({ success: true, data: error });
    });
};

exports.getAll = async (req, res, next) => {
  const result = await Category.find().sort({ date: -1 });
  const user = req.session.user;
  res.render("./category/index", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
};

exports.getOne = async (req, res, next) => {
  const result = await Category.findById({ _id: req.params.id });
  const user = req.session.user;
  res.render("./category/update", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
};

exports.updateOne = async (req, res, next) => {
  const result = await Category.findByIdAndUpdate({ _id: req.params.id });
  result.name = req.body.name
  
  result.save()
    .then(() => {
      res.redirect("/category/all");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};



exports.deleteOne = async (req, res, next) => {
  await Category.findByIdAndDelete({ _id: req.params.id });
  res.redirect("/category/all");
};
