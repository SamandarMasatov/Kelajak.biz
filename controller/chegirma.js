const Chegirma = require("../models/chegirma");
const Course = require("../models/course");
const ObjectId = require("mongodb").ObjectID;
// Chegirma yaratish
exports.create = async (req, res, next) => {
  const today = new Date();
  const startTime = new Date(today.getTime()).toISOString();
  const endTime = new Date(today.getTime() + 30 * 1000).toISOString();

  const result = new Chegirma({
    course_ID: req.body.course_ID,
    amount: req.body.amount,
  });
  const course = await Course.findByIdAndUpdate(result.course_ID);
  course.prev_payment = course.price 
  course.chegirma = result.amount
  course.price = result.amount
  course.save();

  await result
    .save()
    .then(() => {
      res.redirect("/chegirma/all");
      // res.json(result);

    })
    .catch((err) => {
      res.status(400).json({ data: err });
    });
};

exports.getAll = async (req, res, next) => {
  const result = await Chegirma.find()
    .populate({
      path: "course_ID",
      select: ["prev_payment", "price", "title"],
    })
    .sort({ date: -1 });
  const user = req.session.user;
  const subjects = await Course.find()
  res.render("./chegirma/index", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,subjects
  });
};

exports.deleteOne = async (req, res, next) => {
  const result = await Chegirma.findById(req.params.id)
  .populate({
    path: "course_ID",
    select: ["prev_payment", "price", "title"],
  });
  const course = await Course.findByIdAndUpdate(result.course_ID);
  course.price = course.prev_payment 
  course.prev_payment = 0
  course.chegirma = 0
  course.save()

  await Chegirma.findByIdAndDelete({ _id: req.params.id })
  res.redirect("/chegirma/all");
};

// db.time_spent_logs.aggregate([
//   {
//     $group: {
//       _id: "$session_id",
//       events: {
//         $push: {
//           event_type: "$event_type",
//           timestamp: "$timestamp",
//         },
//       },
//     },
//   },
//   {
//     $project: {
//       start: {
//         $cond: {
//           if: {
//             $or: [
//               { $strcasecmp: ["$events[0].event_type", "trending_begin"] },
//               { $strcasecmp: ["$events[0].event_type", "connect_begin"] },
//             ],
//           },
//           then: "$events[0].timestamp",
//           else: "$events[1].timestamp",
//         },
//       },
//       end: {
//         $cond: {
//           if: {
//             $or: [
//               { $strcasecmp: ["$events[0].event_type", "trending_end"] },
//               { $strcasecmp: ["$events[0].event_type", "connect_end"] },
//             ],
//           },
//           then: "$events[0].timestamp",
//           else: "$events[1].timestamp",
//         },
//       },
//     },
//   },
// ]);
