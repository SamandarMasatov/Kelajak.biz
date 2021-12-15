const User = require("../models/moderator");
const path = require('path')
const fs = require('fs')


//moderator ga avtorizatsiya qilish
exports.login = async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.redirect("/admin/login");
    }
    const users = await User.findOne({ email: email }).select("password");
    if (!users) {
        res.redirect("/admin/login");
    }
    const isMatch = await users.matchPassword(password);
    if (!isMatch) {
        res.redirect("/admin/login");
    }
    const body = await User.findOne({ email: req.body.email });
    await body.save({ validateBeforeSave: false })
    req.session.client = body
    req.session.save()
    res.redirect('/')

    //res.json(body)
};

exports.logout = async(req, res, next) => {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.redirect("/");
};

exports.createOne = (req, res, next) => {
    const result = new User({
        name: req.body.name,
        image: `${req.file.filename}`,
        email: req.body.email,
        password: req.body.password,
        role: 'moderator'
    });
    //console.log(result);
    result
        .save()
        .then(() => {
            res.redirect("/moderator/all");
            //res.json(result)
        })
        .catch((error) => {
            res.status(400).json({ success: true, data: error });
        });

};

exports.getAll = async(req, res) => {
    const result = await User.find({ role: 'moderator' })
    res.render('./moderator/index', {
        title: "Kelajak.uz",
        layout: "./layout",
        result,
    });
};


exports.getOne = async(req, res) => {
    const result = await User.findById(req.params.id);
    const user = req.session.user;
    res.render("./moderator/update", {
        title: "Kelejak.uz",
        layout: "./layout",
        user,
        result,
    });
};

exports.updateOne = async(req, res, next) => {
    await User.findByIdAndUpdate({ _id: req.params.id }).exec((error, data) => {
        if (error) {
            throw error
        } else {
            const filePath = path.join(
                __dirname,
                "../public/uploads/moderator/" + data.image
            );
            fs.unlink(filePath, async(err) => {
                if (err) throw err;
            });
        }
    });
    const result = await User.findByIdAndUpdate({ _id: req.params.id });
    result.image = `${req.file.filename}`;
    console.log('res', result.image);
    await result
        .save()
        .then(() => {
            res.redirect("/moderator/all");
        })
        .catch((error) => {
            res.status(400).json({ success: false, data: error });
        });
};

exports.updateInfo = async(req, res, next) => {
    const result = await User.findByIdAndUpdate({ _id: req.params.id });

    result.name = req.body.name;
    result.email = req.body.email;
    result.password = req.body.password
    await result
        .save()
        .then(() => {
            res.redirect("/moderator/all");
        })
        .catch((error) => {
            res.status(400).json({ success: false, data: error });
        });
};


exports.deleteOne = async(req, res, next) => {
    await User.findById({ _id: req.params.id }).exec(async(error, data) => {
        if (error) {
            res.send(error);
        } else {
            const filePath = path.join(
                __dirname,
                "../public/uploads/moderator/" + data.image
            );
            fs.unlink(filePath, async(err) => {
                if (err) throw err;
                await User.findByIdAndDelete({ _id: req.params.id });
                res.redirect("/moderator/all");
            });
        }
    });
};