const Brand = require('../models/brand');
const path = require('path');
const fs = require('fs');


exports.createOne = async (req, res, next) => {
    const result = new Brand({
        image: `${req.file.filename}`,
        name: req.body.name
    })
    await result.save()
    .then(() => {
        res.redirect("/brand/all");
      })
      .catch((error) => {
        res.status(400).json({ success: true, data: error });
      });
};

exports.getAll = async (req, res) => {
    const result = await Brand.find()
    res.render('./brand/index', {
        title: "Kelajak.uz", 
        layout: "./layout",
        result,
      });
};

exports.getOne = async (req, res) => {
    const result = await Brand.findById(req.params.id);
    const user = req.session.user;
    res.render('./brand/index', {
        title: "Kelajak.uz", 
        layout: "./layout",
        result,
        user
      });
};

exports.updateOne = async (req, res, next) => {
    await Brand.findByIdAndUpdate({ _id: req.params.id }).exec((error, data) => {
        if (error) {
            throw error
        } else {
            const filePath = path.join(
                __dirname,
                "../public/uploads/brand/" + data.image
            );
            fs.unlink(filePath, async (err) => {
                if (err) throw err;
            });
        }
    });
    const result = await Brand.findByIdAndUpdate({ _id: req.params.id });
    result.image = `${req.file.filename}`;
    console.log('res',result.image);
    await result
        .save()
        .then(() => {
            res.redirect("/brand/all");
        })
        .catch((error) => {
            res.status(400).json({ success: false, data: error });
        });
  };

  exports.updateInfo = async (req, res, next) => {
    const result = await Brand.findByIdAndUpdate({ _id: req.params.id });
  
    result.name = req.body.name;
    await result
        .save()
        .then(() => {
            res.redirect("/brand/all");
        })
        .catch((error) => {
            res.status(400).json({ success: false, data: error });
        });
  };

exports.deleteOne = async (req, res, next) => {
    await Brand.findById({ _id: req.params.id }).exec(async (error, data) => {
        if (error) {
            res.send(error);
        } else {
            const filePath = path.join(
                __dirname,
                "../public/uploads/brand/" + data.image
            );
            fs.unlink(filePath, async (err) => {
                if (err) throw err;
                await Brand.findByIdAndDelete({ _id: req.params.id });
                res.redirect("/brand/all");
            });
        }
    });
  };
  