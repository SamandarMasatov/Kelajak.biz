const Test = require("../models/test");

exports.createOne = async(req, res, next) => {
    const result = new Test({
        course_ID: req.body.course_ID,
        theme_ID: req.body.theme_ID,
        collection_ID: req.body.collection_ID,
        question: req.body.question,
        options: {
            a: req.body.a,
            b: req.body.b,
            c: req.body.c,
            d: req.body.d,
        },
        answer: req.body.answer
    });
    result
        .save()
        .then(() => {
            res.redirect('/admin/test')
        })
        .catch((error) => { res.status(400).json({ success: true, data: error }) });


};

exports.getAll = async(req, res, next) => {
    const result = await Test.find().sort({ date: -1 });
    const user = req.session.user;
    res.render("./test/index", {
        title: "Kelejak.uz",
        layout: "./layout",
        user,
        result,
    });
};

exports.getOne = async(req, res, next) => {
    const result = await Test.findById({ _id: req.params.id });
    const user = req.session.user;
    res.render("./test/test_update", {
        title: "Kelejak.uz",
        layout: "./layout",
        user,
        result,
    });
};

exports.getInfo = async(req, res, next) => {
    const result = await Test.findById({ _id: req.params.id })
        .populate({
            path: "course_ID",
            select: "title",
        })
        .populate({
            path: "theme_ID",
            select: "name",
        })
        .populate({
            path: "collection_ID",
            select: "name",
        });
    const user = req.session.user;
    res.render("./test/test_info", {
        title: "Kelejak.uz",
        layout: "./layout",
        user,
        result,
    });
};

exports.updateInfo = async(req, res, next) => {
    const result = await Test.findByIdAndUpdate({ _id: req.params.id });
    result.question = req.body.question;
    result.options.a = req.body.a;
    result.options.b = req.body.b;
    result.options.c = req.body.c;
    result.options.d = req.body.d;
    result.answer = req.body.answer;
    await result
        .save()
        .then(() => {
            res.redirect("/test/all");
        })
        .catch((error) => {
            res.status(400).json({ success: false, data: error });
        });
};

exports.deleteOne = async(req, res, next) => {
    await Test.findByIdAndDelete({ _id: req.params.id });
    res.redirect("/test/all");
};