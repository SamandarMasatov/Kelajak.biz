const AddToCourse = require("../models/addtocourse");
const Course = require("../models/course");
const ObjectId = require("mongodb").ObjectID;
const Theme = require("../models/section");
const Category = require("../models/category");



// kurs sotib olish uchun
exports.createOne = async (req, res) => {
  const result = new AddToCourse({
    course_ID: req.body.course_ID,
    user_ID: req.body.user_ID,
  });
  const countDownload = await Course.findByIdAndUpdate({
    _id: result.course_ID,
  });
  countDownload.moreSoldCourse += 1;
  countDownload.save({ validateBeforeSave: false });
  await result
    .save()
    .then(() => {
      res.redirect("/addCourse/all");
    })
    .catch((err) => {
      res.status(400).json({ data: err });
    });
};
// sotib olingan kurslar ro'yhati
exports.getAll = async (req, res) => {
  const user = req.session.user
  const result = await AddToCourse.find()
    .sort({ data: -1 })
    .populate({ path: "course_ID", select: ["title", "price"] })
    .populate({ path: "user_ID", select: "name" });
  

  res.render("./sold/all", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
  // res.json(result)
};
exports.getOne = async (req, res, next) => {
  const result = await AddToCourse.findById({ _id: req.params.id });
  const user = req.session.user;
  res.render("./addCourse/getall", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
};
exports.deleteOne = async (req, res) => {
  await AddToCourse.findByIdAndDelete({ _id: req.params.id });
  res.redirect("/addCourse/all");
  // res.json("Malumot ochdi")
};
// kurslarning ID si boyicha malumot olib berish / => web qismga olib beradi
exports.getMyCourse = async (req, res, next) => {
  const user = req.session.client;
  const category = await Category.find();
  res.render("./WEBSITE/watch_video", {
    title: "Kelajak.biz",
    layout: "./web_layout",
    user,
    category,
  });
};
exports.getMaterials = async (req, res, next) => {
  const infoCourse = await Theme.aggregate([
    {
      $match: {
        course_ID: new ObjectId(req.params.id),
      },
    },
    { $unwind: "$course_ID" },
    {
      $lookup: {
        from: "courses",
        localField: "course_ID",
        foreignField: "_id",
        as: "INFO",
      },
    },
    {
      $group: {
        _id: "$INFO",
      },
    },
  ]);
     
  const result = await Theme.aggregate([
    { $match: { course_ID: new ObjectId(req.params.id) } },
    {
      $lookup: {
        from: "collections",
        localField: "_id",
        foreignField: "section_ID",
        as: "collection",
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "_id",
        foreignField: "section_ID",
        as: "video",
      },
    },
    {
      $lookup: {
        from: "documents",
        localField: "_id",
        foreignField: "section_ID",
        as: "book",
      },
    },
    {
      $lookup: {
        from: "audios",
        localField: "_id",
        foreignField: "section_ID",
        as: "audio",
      },
    },
    // {
    //   $project: {
    //     collection: {
    //       $map: {
    //         input: "$collection",
    //         as: "collectionALL",
    //         in: {
    //           status: "$$collectionALL.status",
    //           name: "$$collectionALL.name",
    //           course_ID: "$$collectionALL.course_ID",
    //           section_ID: "$$collectionALL.section_ID",
    //           amount: "$$collectionALL.amount",
    //           date: "$$collectionALL.date",
    //         },
    //       },
    //     },
    //   },
    // },
    {
      $set: {
        "collection.status": "unblocked",
      },
    },
    {
      $set: {
        "video.status": "unblocked",
      },
    },
    {
      $set: {
        "book.status": "unblocked",
      },
    },
    {
      $set: {
        "audio.status": "unblocked",
      },
    },
  ]);

  res.status(200).json({
    infoCourse,
    result,
  });
};
