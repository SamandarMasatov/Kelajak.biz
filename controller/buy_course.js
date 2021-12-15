const BuyCourse = require("../models/buy_course");
const Course = require("../models/course");
const Section = require("../models/section");
const User = require("../models/user");
const Test = require("../models/test");
const Collection = require("../models/test_collection");
const PDF = require("../models/doc");
const Video = require("../models/video");
const ObjectId = require("mongodb").ObjectID;

exports.createOne = async (req, res, next) => {
  try {
    const user = req.session.client;
    if (!user) {
      res.status(404).json({ data: "User is not defined" });
    }
    const result = new BuyCourse({
      user_ID: user._id,
      course_ID: req.body.course_ID,
    });

    // Foydalanuvchi kurs sotib oladi  va hisobidan pul yechi olinadi
    const product = await Course.findById({ _id: result.course_ID });
    const candidate = await User.findByIdAndUpdate({ _id: user._id });
    const price = product.price;
    if (candidate.balance >= 0 && price > candidate.balance) {
      res.status(400).json({ message: "Mablag yetarli emas" });
    } else if (candidate.balance >= 0 && price <= candidate.balance) {
      const ostatok = candidate.balance - price;
      candidate.balance = ostatok;
      candidate.status = "active";
      candidate.save({ validateBeforeSave: false });

    //   Kurs nechi marotaba sotilgani haqida
      const countDownload = await Course.findByIdAndUpdate({ _id: result.course_ID });
      countDownload.moreSoldCourse += 1
      countDownload.save({ validateBeforeSave: false})

    //   foydalanuvchining malumotlarini d=sessiyaga yozib yuborish 
      const body = await User.findOne({ _id: user._id });
      await body.save({ validateBeforeSave: false });
      req.session.client = body;
      req.session.save();
    }
    result
      .save()
      .then(() => {
        res.status(201).json({ data: result });
      })
      .catch((error) => {
        res.status(400).json({ data: error });
      });
  } catch (e) {
    res.status(400).json({
      success: false,
      data: e,
    });
  }
};

// mening kurslarim bo'limiga kirish uchun
exports.getMyCourse = async (req, res, next) => {
  await BuyCourse.aggregate([
    {
      $match: {
        cours_ID: new ObjectId(req.params.id),
      },
    },
  ]).exec((error, result) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json({ success: true, data: result });
    }
  });
};


exports.getMyVideo = async (req, res, next) => {
  await Video.aggregate([
    {
      $match: {
        section_ID: new ObjectId(req.params.id),
      },
    },
    {
      $set: { status: "unblocked" },
    },
  ]).exec((error, data) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json({ success: true, data });
    }
  });
};

// sotib olingan kursning ichidagi videoga kirish huquqini berish
exports.watchSoldVideo = async (req, res, next) => {
  await Video.aggregate([
    {
      $match: {
        _id: new ObjectId(req.params.id),
      },
    },
    {
      $set: { status: "unblocked" },
    },
    
  ]).exec((error, data) => {
    if (error) {
         throw error;
    } 
    else {
        const user = req.session.client;
        
        if ((user.status == "noactive" ) && (data[0].status == "unblocked")) {
            res.status(400).json({success: false , data: "Sizda videoga kirish uchun huquq mavjud emas",});
        }
        else if((user.status == "active") && ( data[0].status != "unblocked")){
          res.status(400).json({success: false , data: "Sizda videoga kirish uchun huquq mavjud emas",});
        }
        else if((user.status != "active") && ( data[0].status == "unblocked")){
          res.status(400).json({success: false , data: "Sizda videoga kirish uchun huquq mavjud emas",});
        }
        else if((user.status == "active" ) && (data[0].status == "unblocked")){
            res.status(200).json({ success: true, data });
        }
        
    }
  });
};
