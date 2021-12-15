const Team = require("../models/team");
const path = require("path");
const fs = require('fs')

exports.createOne = (req, res) => {
  const result = new Team({
    name: req.body.name,
    image: `${req.file.filename}`,
    position: req.body.position,
    description: req.body.description
  });

  result
    .save()
    .then(() => {
      res.redirect("/team/all");
    })
    .catch((e) => {
      res.json({ data: e });
    });
};

exports.getAll = async (req, res) => {
  const result = await Team.find()
    .sort({ date: -1 })
  res.render('./team/index', {
    title: "Kelejak.uz",
    layout: "./layout",
    result
  })
};

exports.getOne = async (req, res, next) => {
  const result = await Team.findById({ _id: req.params.id });
  res.render("./team/update", {
    title: "Kelejak.uz",
    layout: "./layout",
    result
  });
};


exports.getInfo = async (req, res, next) => {
  const result = await Team.findById({ _id: req.params.id })
  res.render("./team/info", {
    title: "Kelejak.uz",
    layout: "./layout",
    result
  });
};

exports.updateInfo = async (req, res, next) => {
  const result = await Team.findByIdAndUpdate({ _id: req.params.id });
  result.name = req.body.name;
  result.description = req.body.description;
  result.position = req.body.position;
  await result
    .save()
    .then(() => {
      res.redirect("/team/all");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};


exports.updateOne = async (req, res, next) => {
  await Team.findById({ _id: req.params.id }).exec((error, data) => {
    if (error) {
      res.send(error);
    } else {
      const filePath = path.join(
        __dirname,
        "../public/uploads/team" + data.image
      );
      fs.unlink(filePath, async (err) => {
        if (err)
          throw err;
      });
    }
  });
  const result = await Team.findByIdAndUpdate({ _id: req.params.id });
  result.image = `${req.file.filename}`;
  await result
    .save()
    .then(() => {
      res.redirect("/team/all");
    })
    .catch((error) => {
      res.status(400).json({ success: false, data: error });
    });
};

exports.deleteOne = async (req, res) => {
  await Team.findByIdAndDelete({ _id: req.params.id });
  res.redirect('/team/all');
};

