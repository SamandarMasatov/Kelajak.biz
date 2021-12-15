const Course = require("../models/course");
const AddCourse = require("../models/addtocourse");
const User = require("../models/user");
const Category = require("../models/category");
const Section = require("../models/section");
const path = require("path");
const fs = require("fs");

exports.createOne = async(req, res) => {
    let result = new Course({
        title: req.body.title,
        category_ID: req.body.category_ID,
        description: req.body.description,
        price: req.body.price,
        author_name: req.body.author_name,
        image: `${req.file.filename}`,
    });
    await result
        .save()
        .then(() => {
            res.redirect("/course/all");
        })
        .catch((error) => {
            res.status(400).json({ success: true, data: error });
        });
};

exports.getAll = async(req, res, next) => {
    const result = await Course.find().sort({ date: -1 });
    const user = req.session.user;
    const category = await Category.find().sort({ date: -1 });
    res.render("./course/index", {
        title: "Kelejak.uz",
        layout: "./layout",
        user,
        result,
        category
    });
};



exports.getOne = async(req, res, next) => {
    const result = await Course.findById({ _id: req.params.id });
    const user = req.session.user;
    res.render("./course/update", {
        title: "Kelejak.uz",
        layout: "./layout",
        user,
        result,
    });
};

exports.getInfo = async(req, res, next) => {
    const result = await Course.findById({ _id: req.params.id })
        .populate({
            path: "category_ID",
            select: "name"
        })
    const user = req.session.user;
    res.render("./course/info", {
        title: "Kelejak.uz",
        layout: "./layout",
        user,
        result,
    });
};

exports.updateImage = async(req, res, next) => {
    await Course.findById({ _id: req.params.id }).exec((error, data) => {
        if (error) {
            throw error
        } else {
            const filePath = path.join(
                __dirname,
                "../public/uploads/course/" + data.image
            );
            fs.unlink(filePath, async(err) => {
                if (err) throw err;
            });
        }
    });
    const result = await Course.findByIdAndUpdate({ _id: req.params.id });
    result.image = `${req.file.filename}`;
    await result
        .save()
        .then(() => {
            res.redirect("/course/all");
        })
        .catch((error) => {
            res.status(400).json({ success: false, data: error });
        });
};

exports.updateInfo = async(req, res, next) => {
    const result = await Course.findByIdAndUpdate({ _id: req.params.id });
    result.title = req.body.title;
    result.description = req.body.description;
    result.price = req.body.price;
    result.author_name = req.body.author_name;
    await result
        .save()
        .then(() => {
            res.redirect("/course/all");
        })
        .catch((error) => {
            res.status(400).json({ success: false, data: error });
        });
};

exports.deleteOne = async(req, res, next) => {
    await Course.findById({ _id: req.params.id }).exec(async(error, data) => {
        if (error) {
            res.send(error);
        } else {
            const filePath = path.join(
                __dirname,
                "../public/uploads/course/" + data.image
            );
            fs.unlink(filePath, async(err) => {
                if (err) throw err;
            });
            const courseID = data._id // 
            const order = await AddCourse.find({ course_ID: courseID })
            if (!order) {
                res.status(200).json({ message: "Data is not found" })
            }
            order.map(async(item) => {
                await AddCourse.deleteMany({ course_ID: item.course_ID })
            })

            await Course.findByIdAndDelete({ _id: req.params.id })
            res.redirect("/course/all");

        }
    });
};


// hamma malumotni ko'rish null bolganda

exports.getAziosVourse = async(req, res, next) => {
        const result = await Course.find()
        const section = await Section.find()
        const addCourse = await AddCourse.find()
            .populate({
                path: "user_ID",
                select: "name"
            })
            .populate({
                path: "course_ID",
                select: "title"
            })
        res.json({ section, result, addCourse })
    }
    //  null boganni ochirish
exports.deleteADD_COURSE = async(req, res, next) => {
    await AddCourse.findByIdAndDelete({ _id: req.params.id })
    res.status(200).json({ message: "Successfully", data: [] })
}