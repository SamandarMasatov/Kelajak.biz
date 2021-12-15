const Contact = require('../models/contact');
const Course = require('../models/course');


//  kurs sotib olish uchun aloqa 
exports.createOne = async (req, res) => { 
   const user = req.session.client._id
    const result = await new Contact({
        username: user,
        phone: req.body.phone,
        message: req.body.message
    }) 
    await result.save()
     .then(() => { res.status(201).json({ data: result })})
     .catch((err) => { res.status(400).json({ data: err }) })
};


//  unseen list
exports.getAll = async (req, res) => {
    const result = await Contact.find({watch: {$in : "unseen"}})
    .populate(
        {
            path: "username", select: ["name", "email", "image", "phone", "uid", "status"]
        }
    )
    .sort({date: -1})
    const user = req.session.user;
    res.render("./contact/index", {
        title: "Kelejak.uz",
        layout: "./layout",
        user,
        result,
    });
    // res.json(result)
};
// seen list
exports.seenList = async (req, res) => {
    const result = await Contact.find({watch: {$in : "seen"}})
    .populate(
        {
            path: "username", select: ["name", "email", "image", "phone", "uid", "status"]
        }
    )
    .sort({date: -1})
    const user = req.session.user;
    res.render("./contact/seen", {
        title: "Kelejak.uz",
        layout: "./layout",
        user,
        result,
    });
    // res.json(result)
};



// informatsiya olish uchun
exports.getOne = async (req, res) => {
    const result = await Contact.findById({ _id: req.params.id })
    .populate(
        {
            path: "username", select: ["name", "email", "image", "phone", "uid", "status"]
        }
    )
    const user = req.session.user;
    res.render("./contact/info", {
        title: "Kelejak.uz",
        layout: "./layout",
        user,
        result,
    });
    // res.json(result)
};

// ko'rilganlar ro'yhatiga qo'shish uchun kod
exports.makeSeen = async (req, res) => {
    const result = await Contact.findById({ _id: req.params.id })
    .populate(
        {
            path: "username", select: ["name", "email", "image", "phone", "uid", "status"]
        }
    )
    result.watch = "seen"
    result.save({validateBeforeSave: false})
    res.redirect('/contact/all') // redirect bor narsani olib beradi
    // res.json(result)
};



exports.getcourse = async (req, res) => {
    const result = await Contact.findById({ _id: req.params.id })
    .populate(
        {
            path: "username", select: ["name", "email", "image", "phone", "uid", "status"]
        }
    )
    const course = await Course.find().sort({date: -1})
    const user = req.session.user;
    res.render("./contact/get_course", {
        title: "Kelejak.uz",
        layout: "./layout",
        user,
        result,course
    });
    // res.json(result)
};

exports.deleteOne = async (req, res) => {
     await Contact.findByIdAndDelete({ _id: req.params.id });
     res.redirect("/contact/seen")  //bor narsani olib beradi
    // res.json(result)
};