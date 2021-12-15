const Result = require('../models/result');
const ObjectId = require("mongodb").ObjectID;

exports.result_selling = async (req, res, next) => {
    const user = req.session.client
    const result = new Result({
        result: req.body.result,
        totalQuestion: req.body.totalQuestion,
        user_ID: user,
        course_ID: req.body.course_ID,
        theme_ID: req.body.theme_ID,
        collection_ID: req.body.collection_ID,
    })
    result.save()
        .then(() => { res.json(result) })
        .catch((e) => { res.json(e) })
}
exports.result_themed = async (req, res, next) => {
    const user = req.session.client._id
    const result = new Result({
        result: req.body.result, // 25
        totalQuestion: req.body.totalQuestion, // 100
        user_ID: user,
        subject_ID: req.body.subject_ID,
        unit_ID_THEMED: req.body.unit_ID_THEMED,
        theme_ID_THEMED: req.body.theme_ID_THEMED,
        // date: one.toISOString()
    })
    result.save()
        .then(() => { res.json(result) })
        .catch((e) => { res.json(e) })
};
exports.result_varianted = async (req, res, next) => {
    const user = req.session.client._id
    const result = new Result({
        result: req.body.result,
        totalQuestion: req.body.totalQuestion,
        user_ID: user,
        subject_ID: req.body.subject_ID,
        unit_ID_VARIANTED: req.body.unit_ID_VARIANTED,
        variant_ID_VARIANTED: req.body.variant_ID_VARIANTED,
 
    })
    result.save()
        .then(() => { res.status(200).json(result) })
        .catch((e) => { res.status(400).json(e) })
}
exports.result_formed = async (req, res, next) => {
    const user = req.session.client._id
    const result = new Result({
        result: req.body.result,
        totalQuestion: req.body.totalQuestion,
        user_ID: user,
        subject_ID: req.body.subject_ID,
        unit_ID_FORMED: req.body.unit_ID_FORMED,
        form_ID_FORMED: req.body.form_ID_FORMED,
        theme_ID_FORMED: req.body.theme_ID_FORMED,
    })
    result.save()
        .then(() => { res.json(result) })
        .catch((e) => { res.json(e) })
}
exports.result_blocked = async (req, res, next) => {
    const user = req.session.client._id
    const result = new Result({
        result: req.body.result,
        totalQuestion: req.body.totalQuestion,
        user_ID: user,
        subject_ID: req.body.subject_ID,
        unit_ID_BLOCKED: req.body.unit_ID_BLOCKED,
        variant_ID_BLOCKED: req.body.variant_ID_BLOCKED,
    })
    result.save()
        .then(() => { res.json(result) })
        .catch((e) => { res.json(e) })
}





// exports.natija = async (req, res) => {
//     const start = req.body.start
//     const end = req.body.end
//     await Result.aggregate([
//         // {$match: {createdAt: {$gte: new Date(start),$lte: new Date(end)}}},
//         {
//             $group: {
//                 _id: "$user_ID",
//                 total: { $sum: "$totalQuestion" }
//             }
//         },
//         {
//             $lookup: {
//                 from: 'users',
//                 //localField: '_id',
//                 //foreignField: '_id',
//                 let: { 'id': '$_id' },
//                 pipeline: [
//                     { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
//                     {
//                         $project: {
//                             _id: 0,
//                             name: 1,
//                             uid: 1
//                         }
//                     }
//                 ],
//                 as: 'user'
//             }
//         },
//         {
//             $project: {
//                 _id: 0,
//                 total: 1,
//                 user: 1
//             }
//         }
//     ]).exec((err, data) => {
//         if (err) return res.status(400).json({ success: false, err })
//         return res.status(200).json({ success: true, data })
//     })
// };