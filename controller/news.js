const News = require('../models/news');
const path = require('path');
const fs = require('fs');


exports.createOne =  (req, res, next) => {
    const result = new News({
        title: req.body.title,
        description: req.body.description,
        image: `${req.file.filename}`,
        tag: req.body.tag
    })

     result.save()
        .then(() => { res.redirect("/news/all") })
        .catch((e) => { res.json({ data: e }) });

};

exports.getAll = async (req, res) => {
    const result = await News.find()
        .sort({ date: -1 })
    res.render("./news/index", {
        title: "Kelejak.uz",
        layout: "./layout",
        result,
    });
};

exports.getOne = async (req, res, next) => {
    const result = await News.findById({ _id: req.params.id });
    res.render("./news/update", {
      title: "Kelejak.uz",
      layout: "./layout",
      result
    });
  };

  exports.getInfo = async (req, res, next) => {
    const result = await News.findById({ _id: req.params.id })
    res.render("./news/info", {
      title: "Kelejak.uz",
      layout: "./layout",
      result
    });
  };


exports.UpdateOne = async (req, res, next) => {
    await News.findByIdAndUpdate({ _id: req.params.id }).exec((error, data) => {
        if (error) {
            throw error
        } else {
            const filePath = path.join(
                __dirname,
                "../public/uploads/news/" + data.image
            );
            fs.unlink(filePath, async (err) => {
                if (err) throw err;
            });
        }
    });
    const result = await News.findByIdAndUpdate({ _id: req.params.id });
    result.image = `${req.file.filename}`;
    await result
        .save()
        .then(() => {
            res.redirect("/news/all");
        })
        .catch((error) => {
            res.status(400).json({ success: false, data: error });
        });
};

exports.updateInfo = async (req, res, next) => {
    const result = await News.findByIdAndUpdate({ _id: req.params.id });

    result.title = req.body.title;
    result.description = req.body.description;
    result.tag = req.body.tag
    await result
        .save()
        .then(() => {
            res.redirect("/news/all");
        })
        .catch((error) => {
            res.status(400).json({ success: false, data: error });
        });
};

exports.deleteOne = async (req, res, next) => {
    await News.findById({ _id: req.params.id }).exec(async (error, data) => {
        if (error) {
            res.send(error);
        } else {
            const filePath = path.join(
                __dirname,
                "../public/uploads/news/" + data.image
            );
            fs.unlink(filePath, async (err) => {
                if (err) throw err;
                await News.findByIdAndDelete({ _id: req.params.id });
                res.redirect("/news/all");
            });
        }
    });
};


