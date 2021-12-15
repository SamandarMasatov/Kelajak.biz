const Course = require("../models/course");
const Section = require("../models/section");
const Collection = require("../models/test_collection");
const Category = require("../models/category");
const Theme = require("../models/section");
const ObjectId = require("mongodb").ObjectID;
const Selling_TEST = require('../models/test')
const test_for_themed = require('../models/test/themed/tests')
const test_for_varianted = require('../models/test/varianted/test')
const test_for_formed= require('../models/test/formed/tests')





// Kursning id si boyicha hamma mavzularni olish
exports.filterCourseTheme = async (req, res) => {
  const result = await Section.find({ course_ID: req.params.id }).populate({
    path: "course_ID",
    select: "title",
  });
  res.status(200).json({ success: true, data: result });
};

// MAvzuning  id si boyicha hamma kollektsiyalarri olish
exports.filterSectionCollection = async (req, res) => {
  const result = await Collection.find({ section_ID: req.params.id }).populate({
    path: "section_ID",
    select: "title",
  });
  res.status(200).json({ success: true, data: result });
};

// Kategoriyaning id si boyicha hamma kurslarni olish
exports.filterCourseCategory = async (req, res) => {
  const result = await Course.find({ category_ID: req.params.id }).populate({
    path: "category_ID",
    select: ["name", "image"],
  });
  const user = req.session.client;
  const category = await Category.find();
  res.render("./WEBSITE/center_courses", {
    title: "Kelajak.uz",
    layout: "./web_layout",
    user,
    result,
    category,
  });
};
// Kursnning id si bo'yicha hamma mavzularni olish
exports.filterThemeCourse = async (req, res) => {
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
      "$group": { 
      "_id": "$INFO",
      }
    },
  ])

  const result = await Theme.aggregate([
    {
      $match: {
        course_ID: new ObjectId(req.params.id),
      },
    },
    // shu mavzuga oid hamma test collection larni olib keladi
    {
      $lookup: {
        from: "collections",
        localField: "_id",
        foreignField: "section_ID",
        as: "COLLECTION",
      },
    },
    // shu mavzuga oid hamma videolarni larni olib keladi
    {
      $lookup: {
        from: "videos",
        localField: "_id",
        foreignField: "section_ID",
        as: "VIDEO",
      },
    },
    // shu mavzuga oid hamma PDFni larni olib keladi
    {
      $lookup: {
        from: "documents",
        localField: "_id",
        foreignField: "section_ID",
        as: "PDF",
      },
    },
    // shu mavzuga oid hamma PDFni larni olib keladi
    {
      $lookup: {
        from: "audios",
        localField: "_id",
        foreignField: "section_ID",
        as: "AUDIO",
      },
    },
  ]);

  const user = req.session.client;
  const category = await Category.find();
  res.render("./WEBSITE/one_course", {
    title: "Kelajak.uz",
    layout: "./web_layout",
    user,result,category,infoCourse
  });
  // res.json(result)
};


// natijalarni  ikkita sana oraligida filtrilash

 exports.filter_StartDate_EndDate = async (req, res, next) => {
   const start_date = req.query.start_date;
   const end_date = req.query.end_date;

   
   res.json(start_date)
 };


//  let start = new Date;
//  start.setDate(get.Date.now() - 7)