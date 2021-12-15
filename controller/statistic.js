const User = require("../models/user");
const Subject = require("../models/test/subject");
const ObjectId = require("mongodb").ObjectID;
const Course = require("../models/course");
const AddCourse = require("../models/addtocourse");
const News = require("../models/news");
const Team = require("../models/team");
const Brand = require("../models/brand");

exports.users = async(req, res, next) => {
    const result = await User.find({ role: { $in: "user" } }).count();
    res.json(result);
};
exports.news = async(req, res, next) => {
    const result = await News.find().count();
    res.json(result);
};
exports.teams = async(req, res, next) => {
    const result = await Team.find().count();
    res.json(result);
};
exports.brands = async(req, res, next) => {
    const result = await Brand.find().count();
    res.json(result);
};
exports.sold_course = async(req, res, next) => {
    const result = await AddCourse.find().count();
    res.json(result);
};
exports.course = async(req, res, next) => {
    const result = await Course.find().count();
    res.json(result);
};

// Umumiy kurslar soni
exports.countCourse = async(req, res, next) => {
    const result = await Course.find().count();
    res.json(result);
};
// Umumiy sotilgan kurslar
exports.countSoldCouse = async(req, res, next) => {
    const result = await AddCourse.find().count();
    res.json(result);
};
// eng yaxshi o'quvchilarni olish barcha ishlagan testlari boyicha filtrlash
exports.best_make_test_human = async(req, res, next) => {
    const result = await User.aggregate([{
            $project: {
                name: 1,
                _id: 1,
            },
        },
        {
            $lookup: {
                from: "results",
                localField: "_id",
                foreignField: "user_ID",
                as: "Own_Result",
            },
        },
        // {
        //   $lookup: {
        //     from: "results",
        //     let: { user_ID: "$_id" },
        //     pipeline: [
        //       {
        //         $match: {
        //           $expr: { $eq: ["$user_ID", "$$user_ID"] },
        //         },
        //       },
        //       {
        //         $project: {
        //           result: 1,
        //           totalQuestion: 1,
        //           _id: 0
        //         },
        //       },
        //     ],
        //     as: "Own_Result",
        //   }
        // },
        {
            $project: {
                name: 1,
                results: { $sum: "$Own_Result.result" },
                totalQuestion: { $sum: "$Own_Result.totalQuestion" },
            },
        },
        {
            $set: {
                percentage: {
                    $cond: [
                        { $eq: ["$totalQuestion", 0] },
                        0,
                        {
                            $divide: [{ $multiply: ["$results", 100] }, "$totalQuestion"],
                        },
                    ],
                },
            },
        },
        {
            $project: {
                name: 1,
                percentage: 1,
                _id: 0,
            },
        },
        {
            $sort: { percentage: -1 },
        },
    ]);

    res.json(result);
};
// 1 hafta, 1 oy, 3 oy, 6 oy, 1 yillik boyicha eng zor foydalanuvchilarni topish
exports.filter_by_One_Week = async(req, res, next) => {
    const today = new Date();
    const threeMinute = 1000 * 60 * 60 * 24 * 7; // bir hafta
    const before_TIME = new Date(today.getTime() - threeMinute);
    const result = await User.aggregate([{
            $project: {
                name: 1,
                _id: 1,
            },
        },
        {
            $lookup: {
                from: "results",
                localField: "_id",
                foreignField: "user_ID",
                as: "Own_Result",
            },
        },
        {
            $match: {
                "Own_Result.date": { $gte: before_TIME },
            },
        },
        {
            $project: {
                name: 1,
                result: { $sum: "$Own_Result.result" },
                totalQuestion: { $sum: "$Own_Result.totalQuestion" },
                _id: 0,
            },
        },
        {
            $set: {
                percentage: {
                    $cond: [
                        { $eq: ["$totalQuestion", 0] },
                        0,
                        {
                            $divide: [{ $multiply: ["$result", 100] }, "$totalQuestion"],
                        },
                    ],
                },
            },
        },
        {
            $project: {
                name: 1,
                percentage: 1,
                _id: 0,
            },
        },
        {
            $sort: { percentage: -1 },
        },
    ]);
    res.status(200).json({ message: "One Week Statistic", data: result });
};
exports.filter_by_One_Month = async(req, res, next) => {
    const today = new Date();
    const threeMinute = 1000 * 60 * 60 * 24 * 30; // bir oy
    const before_TIME = new Date(today.getTime() - threeMinute);
    await User.aggregate([{
            $project: {
                name: 1,
                _id: 1,
            },
        },
        {
            $lookup: {
                from: "results",
                localField: "_id",
                foreignField: "user_ID",
                as: "Own_Result",
            },
        },
        {
            $match: {
                "Own_Result.date": { $gte: before_TIME },
            },
        },
        {
            $project: {
                name: 1,
                result: { $sum: "$Own_Result.result" },
                totalQuestion: { $sum: "$Own_Result.totalQuestion" },
                _id: 0,
            },
        },
        {
            $set: {
                percentage: {
                    $cond: [
                        { $eq: ["$totalQuestion", 0] },
                        0,
                        {
                            $divide: [{ $multiply: ["$result", 100] }, "$totalQuestion"],
                        },
                    ],
                },
            },
        },
        {
            $project: {
                name: 1,
                percentage: 1,
                _id: 0,
            },
        },
        {
            $sort: { percentage: -1 },
        },
    ]).exec((error, result) => {
        if (error) {
            return res.status(404).json({
                status: "Error",
                code: 10004,
                message: {
                    en: "No information found!",
                    uz: "Маълумот топилмади!",
                    ru: "Данные не найдены!",
                },
            });
        } else {
            return res.status(200).json({
                status: "Success",
                data: result,
            });
        }
    });
};
exports.filter_by_Three_Month = async(req, res, next) => {
    const today = new Date();
    const threeMinute = 1000 * 60 * 60 * 24 * 30 * 3; // uch oy
    const before_TIME = new Date(today.getTime() - threeMinute);
    await User.aggregate([{
            $project: {
                name: 1,
                _id: 1,
            },
        },
        {
            $lookup: {
                from: "results",
                localField: "_id",
                foreignField: "user_ID",
                as: "Own_Result",
            },
        },
        {
            $match: {
                "Own_Result.date": { $gte: before_TIME },
            },
        },
        {
            $project: {
                name: 1,
                result: { $sum: "$Own_Result.result" },
                totalQuestion: { $sum: "$Own_Result.totalQuestion" },
                _id: 0,
            },
        },
        {
            $set: {
                percentage: {
                    $cond: [
                        { $eq: ["$totalQuestion", 0] },
                        0,
                        {
                            $divide: [{ $multiply: ["$result", 100] }, "$totalQuestion"],
                        },
                    ],
                },
            },
        },
        {
            $project: {
                name: 1,
                percentage: 1,
                _id: 0,
            },
        },
        {
            $sort: { percentage: -1 },
        },
    ]).exec((error, result) => {
        if (error) {
            return res.status(404).json({
                status: "Error",
                code: 10004,
                message: {
                    en: "No information found!",
                    uz: "Маълумот топилмади!",
                    ru: "Данные не найдены!",
                },
            });
        } else {
            return res.status(200).json({
                status: "Success",
                data: result,
            });
        }
    });
};
exports.filter_by_Six_Month = async(req, res, next) => {
    const today = new Date();
    const threeMinute = 1000 * 60 * 60 * 24 * 30 * 6; // olti oy
    const before_TIME = new Date(today.getTime() - threeMinute);
    await User.aggregate([{
            $project: {
                name: 1,
                _id: 1,
            },
        },
        {
            $lookup: {
                from: "results",
                localField: "_id",
                foreignField: "user_ID",
                as: "Own_Result",
            },
        },
        {
            $match: {
                "Own_Result.date": { $gte: before_TIME },
            },
        },
        {
            $project: {
                name: 1,
                result: { $sum: "$Own_Result.result" },
                totalQuestion: { $sum: "$Own_Result.totalQuestion" },
                _id: 0,
            },
        },
        {
            $set: {
                percentage: {
                    $cond: [
                        { $eq: ["$totalQuestion", 0] },
                        0,
                        {
                            $divide: [{ $multiply: ["$result", 100] }, "$totalQuestion"],
                        },
                    ],
                },
            },
        },
        {
            $project: {
                name: 1,
                percentage: 1,
                _id: 0,
            },
        },
        {
            $sort: { percentage: -1 },
        },
    ]).exec((error, result) => {
        if (error) {
            return res.status(404).json({
                status: "Error",
                code: 10004,
                message: {
                    en: "No information found!",
                    uz: "Маълумот топилмади!",
                    ru: "Данные не найдены!",
                },
            });
        } else {
            return res.status(200).json({
                status: "Success",
                data: result,
            });
        }
    });
};
exports.filter_by_One_Year = async(req, res, next) => {
    const today = new Date();
    const threeMinute = 1000 * 60 * 60 * 24 * 30 * 12; // bir yil
    const before_TIME = new Date(today.getTime() - threeMinute);
    await User.aggregate([{
            $project: {
                name: 1,
                _id: 1,
            },
        },
        {
            $lookup: {
                from: "results",
                localField: "_id",
                foreignField: "user_ID",
                as: "Own_Result",
            },
        },
        {
            $match: {
                "Own_Result.date": { $gte: before_TIME },
            },
        },
        {
            $project: {
                name: 1,
                result: { $sum: "$Own_Result.result" },
                totalQuestion: { $sum: "$Own_Result.totalQuestion" },
                _id: 0,
            },
        },
        {
            $set: {
                percentage: {
                    $cond: [
                        { $eq: ["$totalQuestion", 0] },
                        0,
                        {
                            $divide: [{ $multiply: ["$result", 100] }, "$totalQuestion"],
                        },
                    ],
                },
            },
        },
        {
            $project: {
                name: 1,
                percentage: 1,
                _id: 0,
            },
        },
        {
            $sort: { percentage: -1 },
        },
    ]).exec((error, result) => {
        if (error) {
            return res.status(404).json({
                status: "Error",
                code: 10004,
                message: {
                    en: "No information found!",
                    uz: "Маълумот топилмади!",
                    ru: "Данные не найдены!",
                },
            });
        } else {
            return res.status(200).json({
                status: "Success",
                data: result,
            });
        }
    });
};




// Har bir test yechgan foydalanuvchi Test yechganlar orasida o’zi yechgan fan bo’yicha nechanchi o’rinda ekanligini birdan kurish imkonyati
exports.filter_by_Free_Subject = async(req, res, next) => {
    const result = await Subject.aggregate([{
        $lookup: {
            from: "results",
            let: { subject_ID: "$_id" },
            pipeline: [
                { $match: { $expr: { $eq: ["$subject_ID", "$$subject_ID"] } } },
                {
                    $group: {
                        _id: "$user_ID",
                        totalQuestion: { $sum: "$totalQuestion" },
                        result: { $sum: "$result" },
                    },
                },
                {
                    $set: {
                        percentage: {
                            $cond: [
                                { $eq: ["$totalQuestion", 0] },
                                0,
                                {
                                    $divide: [
                                        { $multiply: ["$result", 100] },
                                        "$totalQuestion",
                                    ],
                                },
                            ],
                        },
                    },
                },
                {
                    $sort: { percentage: -1 },
                },
            ],
            as: "result_of_subjects",
        },
    }, ]);

    res
        .status(200)
        .json({ message: "User is filtered by subjects", data: result });
};
// 1 kunlik, 1  haftalik 1 oylik, 3 oylik, boyicha sotilgan kurslar ro'yhatini shakllantirish
exports.sold_course_ALL = async(req, res, next) => {
    const today = new Date();
    const one_day = 1000 * 60 * 60 * 24 * 1; //1 kun
    const sold_1_kun = new Date(today.getTime() - one_day);
    const seven_day = 1000 * 60 * 60 * 24 * 7; // 7 kun
    const sold_7_kun = new Date(today.getTime() - seven_day);
    const one_month = 1000 * 60 * 60 * 24 * 30; // 1 oy
    const sold_30_kun = new Date(today.getTime() - one_month);
    const three_month = 1000 * 60 * 60 * 24 * 30 * 3; // 3 oy
    const sold_3_month = new Date(today.getTime() - three_month);
    pipeline = [{
            $project: {
                title: 1,
            },
        },
        {
            $lookup: {
                from: "addcourses",
                let: { course_ID: "$_id" },
                pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ["$course_ID", "$$course_ID"],
                            },
                        },
                    },
                    {
                        $match: {
                            date: { $gte: sold_1_kun },
                        },
                    },
                    {
                        $count: "sold_1_kun",
                    },
                ],
                as: "sold_1_kun",
            },
        },
        {
            $lookup: {
                from: "addcourses",
                let: { course_ID: "$_id" },
                pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ["$course_ID", "$$course_ID"],
                            },
                        },
                    },
                    {
                        $match: {
                            date: { $gte: sold_7_kun },
                        },
                    },
                    {
                        $count: "sold_7_kun",
                    },
                ],
                as: "sold_7_kun",
            },
        },

        {
            $lookup: {
                from: "addcourses",
                let: { course_ID: "$_id" },
                pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ["$course_ID", "$$course_ID"],
                            },
                        },
                    },
                    {
                        $match: {
                            date: { $gte: sold_30_kun },
                        },
                    },
                    {
                        $count: "sold_30_kun",
                    },
                ],
                as: "sold_30_kun",
            },
        },
        {
            $lookup: {
                from: "addcourses",
                let: { course_ID: "$_id" },
                pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ["$course_ID", "$$course_ID"],
                            },
                        },
                    },
                    {
                        $match: {
                            date: { $gte: sold_3_month },
                        },
                    },
                    {
                        $count: "sold_3_month",
                    },
                ],
                as: "sold_3_month",
            },
        },
    ];
    await Course.aggregate(pipeline).exec((error, result) => {
        if (error) {
            return res.status(404).json({
                status: "Error",
                code: 10004,
                message: {
                    en: "No information found!",
                    uz: "Маълумот топилмади!",
                    ru: "Данные не найдены!",
                },
            });
        } else {
            return res.status(200).json({
                status: "Success",
                data: result,
            });
        }
    });
};

//  Har bir fan boyicha nechta testlar qoshilganini larni chiqarish
exports.materialOfFreeSubjects = async(req, res, next) => {
    await Subject.aggregate([
        // mavzulashgan boyicha olish
        {
            $lookup: {
                from: "unit_themeds",
                let: { subject_ID: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$subject_ID", "$$subject_ID"] } } },
                    {
                        $lookup: {
                            from: "themes_themeds",
                            let: { unit_ID: "$_id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$unit_ID", "$$unit_ID"] } } },
                                {
                                    $lookup: {
                                        from: "test_themeds",
                                        let: { theme_THEMED: "$_id" },
                                        pipeline: [{
                                                $match: {
                                                    $expr: { $eq: ["$theme_THEMED", "$$theme_THEMED"] },
                                                },
                                            },
                                            {
                                                $count: "all_count_themed",
                                            },
                                        ],
                                        as: "test_themeds_ALL",
                                    },
                                },
                            ],
                            as: "themes_themeds_ALL",
                        },
                    },
                    {
                        $group: {
                            _id: "$themes_themeds_ALL.test_themeds_ALL.all_count_themed",
                        },
                    },
                    { $unwind: "$_id" },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: { $sum: { $arrayElemAt: ["$_id", 0] } } },
                        },
                    },
                ],

                as: "unit_themeds_ALL",
            },
        },
        // variantlashgan boyicha olish
        {
            $lookup: {
                from: "unit_varianteds",
                let: { subject_ID: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$subject_ID", "$$subject_ID"] } } },
                    {
                        $lookup: {
                            from: "variant_varianteds",
                            let: { unit_ID: "$_id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$unit_ID", "$$unit_ID"] } } },
                                {
                                    $lookup: {
                                        from: "test_varianteds",
                                        let: { variant_VARIANTED: "$_id" },
                                        pipeline: [{
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$variant_VARIANTED", "$$variant_VARIANTED"],
                                                    },
                                                },
                                            },
                                            {
                                                $count: "all_count_varianted",
                                            },
                                        ],
                                        as: "test_varianteds_ALL",
                                    },
                                },
                            ],
                            as: "variant_varianteds_ALL",
                        },
                    },
                    {
                        $group: {
                            _id: "$variant_varianteds_ALL.test_varianteds_ALL.all_count_varianted",
                        },
                    },
                    { $unwind: "$_id" },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: { $sum: { $arrayElemAt: ["$_id", 0] } } },
                        },
                    },
                ],
                as: "unit_varianteds_ALL",
            },
        },
        // bloklashtirilgan boyich olish
        {
            $lookup: {
                from: "unit_blockeds",
                let: { subject_ID: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$subject_ID", "$$subject_ID"] } } },
                    {
                        $lookup: {
                            from: "variant_blockeds",
                            let: { unit_ID: "$_id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$unit_ID", "$$unit_ID"] } } },
                                {
                                    $lookup: {
                                        from: "test_blockeds",
                                        let: { variant_BLOCKED: "$_id" },
                                        pipeline: [{
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$variant_BLOCKED", "$$variant_BLOCKED"],
                                                    },
                                                },
                                            },
                                            {
                                                $count: "all_count_blocked",
                                            },
                                        ],
                                        as: "test_blockeds",
                                    },
                                },
                            ],
                            as: "unit_blockeds_ALL",
                        },
                    },
                    {
                        $group: {
                            _id: "$unit_blockeds_ALL.test_blockeds.all_count_blocked",
                        },
                    },
                    { $unwind: "$_id" },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: { $sum: { $arrayElemAt: ["$_id", 0] } } },
                        },
                    },
                ],
                as: "unit_blockeds_ALL",
            },
        },
        // sinflashtirilgan boyicha olish
        {
            $lookup: {
                from: "unit_formeds",
                let: { subject_ID: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$subject_ID", "$$subject_ID"] } } },
                    {
                        $lookup: {
                            from: "form_formeds",
                            let: { unit_ID: "$_id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$unit_ID", "$$unit_ID"] } } },
                                {
                                    $lookup: {
                                        from: "theme_formeds",
                                        let: { form_ID: "$_id" },
                                        pipeline: [
                                            { $match: { $expr: { $eq: ["$form_ID", "$$form_ID"] } } },
                                            {
                                                $lookup: {
                                                    from: "test_formeds",
                                                    let: { theme_FORMED: "$_id" },
                                                    pipeline: [{
                                                            $match: {
                                                                $expr: {
                                                                    $eq: ["$theme_FORMED", "$$theme_FORMED"],
                                                                },
                                                            },
                                                        },
                                                        {
                                                            $count: "all_count_formed",
                                                        },
                                                    ],
                                                    as: "test_formeds_ALL",
                                                },
                                            },
                                        ],
                                        as: "theme_formeds_ALL",
                                    },
                                },
                            ],
                            as: "form_formeds_ALL",
                        },
                    },
                    {
                        $group: {
                            _id: "$form_formeds_ALL.theme_formeds_ALL.test_formeds_ALL.all_count_formed",
                        },
                    },
                    { $unwind: "$_id" },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: { $sum: { $arrayElemAt: ["$_id", 0] } } },
                        },
                    },
                ],
                as: "unit_formeds_ALL",
            },
        },
        // umumiy testlar sonini ko'rish
        {
            $set: {
                all_test_COUNT: {
                    $concatArrays: [
                        "$unit_themeds_ALL.count",
                        "$unit_varianteds_ALL.count",
                        "$unit_blockeds_ALL.count",
                        "$unit_formeds_ALL.count",
                    ],
                },
            },
        },
        {
            $project: {
                name: 1,
                "unit_themeds_ALL.count": 1,
                "unit_varianteds_ALL.count": 1,
                "unit_blockeds_ALL.count": 1,
                "unit_formeds_ALL.count": 1,
                all_test_COUNT: { $sum: "$all_test_COUNT" },
            },
        },
    ]).exec((error, result) => {
        if (error) {
            return res.status(404).json({
                status: "Error",
                code: 10004,
                message: {
                    en: "No information found!",
                    uz: "Маълумот топилмади!",
                    ru: "Данные не найдены!",
                },
            });
        } else {
            return res.status(200).json({
                status: "Success",
                data: result,
            });
        }
    });
};
//  Har bir kurslar bo'yicha testlar, audiolar, videolar, pdf larni chiqarish
exports.materialOfSellingSubjects = async(req, res, next) => {
    await Course.aggregate([{
        $lookup: {
            from: "sections",
            let: { course_ID: "$_id" },
            pipeline: [
                { $match: { $expr: { $eq: ["$course_ID", "$$course_ID"] } } },
                // mavzu boyicha hamma test bolimlarini ajratib olish
                {
                    $lookup: {
                        from: "collections",
                        let: { section_ID: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$section_ID", "$$section_ID"] } } },
                            {
                                $lookup: {
                                    from: "tests",
                                    let: { collection_ID: "$_id" },
                                    pipeline: [{
                                            $match: {
                                                $expr: { $eq: ["$collection_ID", "$$collection_ID"] },
                                            },
                                        },
                                        {
                                            $count: "counts",
                                        },
                                    ],
                                    as: "all_collection_test",
                                },
                            },
                            {
                                $group: {
                                    _id: "$all_collection_test.counts",
                                },
                            },
                            { $unwind: "$_id" },
                            {
                                $group: {
                                    _id: null,
                                    count: { $sum: { $sum: "$_id" } },
                                },
                            },
                        ],
                        as: "mavzu_boyicha_test_bolimlar",
                    },
                },
                // mavzu boyicha hamma audiolarni ajratib olish
                {
                    $lookup: {
                        from: "audios",
                        let: { section_ID: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$section_ID", "$$section_ID"] } } },
                            {
                                $count: "counts",
                            },
                        ],
                        as: "mavzu_boyicha_audiolar",
                    },
                },
                // mavzu boyicha hamma kitoblarni ajratib olish
                {
                    $lookup: {
                        from: "documents",
                        let: { section_ID: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$section_ID", "$$section_ID"] } } },
                            {
                                $count: "counts",
                            },
                        ],
                        as: "mavzu_boyicha_kitoblar",
                    },
                },
                // mavzu boyicha hamma videolarni ajratib olish
                {
                    $lookup: {
                        from: "videos",
                        let: { section_ID: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$section_ID", "$$section_ID"] } } },
                            {
                                $count: "counts",
                            },
                        ],
                        as: "mavzu_boyicha_videolar",
                    },
                },
            ],
            as: "fan_mavzulari",
        },
    }, ]).exec((error, result) => {
        if (error) {
            return res.status(404).json({
                status: "Error",
                code: 10004,
                message: {
                    en: "No information found!",
                    uz: "Маълумот топилмади!",
                    ru: "Данные не найдены!",
                },
            });
        } else {
            return res.status(200).json({
                status: "Success",
                data: result,
            });
        }
    });
};