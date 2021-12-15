const Category = require("../../models/category");
const SoldCourse = require("../../models/buy_course");
const MyCourse = require("../../models/addtocourse");
const MyResult = require("../../models/result");
const Course = require("../../models/course");
const User = require("../../models/user");
const Test_Selling = require("../../models/test");
const Test_Varianted = require("../../models/test/varianted/test");
const Test_Formed = require("../../models/test/formed/tests");
const Test_Themed = require("../../models/test/themed/tests");
const Subject_FREE = require("../../models/test/subject");
const Team = require('../../models/team');
const Brand = require('../../models/brand');
const Pdf = require('../../models/doc');


exports.home = async (req, res, next) => {
  const category = await Category.find()
  const Courses = await Course.find() 
  const teamAll = await Team.find()
  const brandAll = await Brand.find() 
  const count_Course = await Course.find().countDocuments()
  const count_Pupil = await User.find({role: {$in: "user"}}).countDocuments()
  const test_Selling = await Test_Selling.find().countDocuments()
  const test_Varianted = await Test_Varianted.find().countDocuments()
  const test_Formed = await Test_Formed.find().countDocuments()
  const test_Themed = await Test_Themed.find().countDocuments()
  const test_ALL_count = (test_Selling +test_Varianted + test_Formed + test_Themed + test_Themed);

  
  const user = req.session.client 
  res.render("./WEBSITE/index", {
    title: "Kelajak.biz",
    layout: "./web_layout",
    user, category,Courses,teamAll,
    count_Course, count_Pupil, test_ALL_count, brandAll,
  });
  // console.log(test_ALL_count)
};
exports.courses = async (req, res, next) => {
  const category = await Category.find();
  const result = await Course.find()
  const user = req.session.client;
  res.render("./WEBSITE/center_courses", {
    title: "Kelajak.biz",
    layout: "./web_layout",
    user,
    category,
    result
  });
};


exports.info = async (req, res, next) => {
  const category = await Category.find();
  const user = req.session.client;
  res.render("./WEBSITE/center_info", {
    title: "Kelajak.biz",
    layout: "./web_layout",
    user,
    category,
  });
};
exports.one_course = async (req, res, next) => {
  const category = await Category.find();
  const user = req.session.client;
  res.render("./WEBSITE/one_course", {
    title: "Kelajak.biz",
    layout: "./web_layout",
    user,
    category,
  });
};
exports.watch_video = async (req, res, next) => {
  const user = req.session.client;
  const category = await Category.find();
  res.render("./WEBSITE/watch_video", {
    title: "Kelajak.biz",
    layout: "./web_layout",
    user,
    category,
  });
};
exports.profile_kurs = async (req, res, next) => {
  const user = req.session.client;
  const category = await Category.find();
  res.render("./WEBSITE/profile_kurs", {
    title: "Kelajak.biz",
    layout: "./web_layout",
    user,
    category,
  });
};
exports.profile_result_ENTER = async (req, res, next) => {
  const user = req.session.client;
  const category = await Category.find();
  const result = await MyResult.find({ user_ID: req.params.id });
  res.render("./WEBSITE/profile_result", {
    title: "Kelajak.biz",
    layout: "./web_layout",
    user,
    category,
  });
};
exports.getAll_COURSE = async (req, res, next) => {
  const user = req.session.client;
  const category = await Category.find()
  const coursesAll = await Course.find().sort({date: -1}).populate({path: "category_ID", select: "name"})
  res.json(coursesAll)
};   
exports.getAll_RESULT = (req, res, next) => {
  res.render("./WEBSITE/answer", {layout: "./test_layout", title: "Natijalar"})
};   
exports.profile_kurs_ENTER = async (req, res, next) => {
  const user = req.session.client;
  const category = await Category.find();
  const result = await MyCourse.find({ user_ID: req.params.id })
    .sort({ date: -1 })
    .populate({
      path: "course_ID",
      select: [
        "title", 
        "description",
        "image",
        "price",
        "author_name",
        "rating",
        "moreSeenCourse",
        "moreSoldCourse",
        "chegirma",
        "date",
      ],
    });

  res.render("./WEBSITE/profile_kurs", {
    title: "Kelajak.biz",
    layout: "./web_layout",
    user,
    result,
    category,
  });

};
exports.test_course = async (req, res, next) => {
  const user = req.session.client;
  const category = await Category.find();
  const result = await Test_Selling.find({ collection_ID: req.params.id });
  res.render("./WEBSITE/test_course", {
    title: "Kelajak.biz",
    layout: "./test_layout",
    user, 
    result,category
  });
};

exports.test_Course_All = async (req, res, next) => {
  const result = await Test_Selling.find();
  res.send(result);
};
exports.getAllSubjects = async (req, res, next) => {
  const subject = await Subject_FREE.find();
  res.json(subject)
}
// ======================================== pdf ================================
exports.pdf_course = async (req, res, next) => {
  const user = req.session.client;
  const category = await Category.find();
  const result = await Pdf.find({ _id: req.params.id});
  res.render("./WEBSITE/pdf_course", {
    title: "Kelajak.biz",
    layout: "./test_layout",
    user, 
    result,category
  });
};
// ======================================== FREE test   ========================================
exports.get_Free_test = async (req, res, next) => {
  const user = req.session.client;
  const category = await Category.find();
  res.render("./WEBSITE/FREE_test/index", {
    title: "Kelajak.biz",
    layout: "./web_layout",
    user,
    category,
  });
};
// ----------------------------------------------------
// Test turlari boyicha filtrlash
exports.formed = async (req, res, next) => {
  const AllSubjects = await Subject_FREE.find();
  const user = req.session.client;
  const category = await Category.find();
  res.render("./WEBSITE/FREE_test/formed/select", {
    title: "Kelajak.biz",
    layout: "./web_layout",
    user,
    category,
    AllSubjects,
  });
};
exports.varianted = async (req, res, next) => {
  const AllSubjects = await Subject_FREE.find();
  const user = req.session.client;
  const category = await Category.find();
  res.render("./WEBSITE/FREE_test/varianted/select", {
    title: "Kelajak.biz",
    layout: "./web_layout",
    user,
    category,
    AllSubjects,
  });
};
exports.blocked = async (req, res, next) => {
  const AllSubjects = await Subject_FREE.find();
  const user = req.session.client;
  const category = await Category.find();
  res.render("./WEBSITE/FREE_test/block/select", {
    title: "Kelajak.biz",
    layout: "./web_layout",
    user,
    category,
    AllSubjects,
  });
};
exports.themed = async (req, res, next) => {
  const AllSubjects = await Subject_FREE.find();
  const user = req.session.client;
  const category = await Category.find();
  res.render("./WEBSITE/FREE_test/themed/select", {
    title: "Kelajak.biz",
    layout: "./web_layout",
    user,
    category,
    AllSubjects
  });
};


// -----------------------------------------------------

// Mavzulashtirilgan testlarni olish 
exports.solution_test = async (req, res, next) => { 
  const user = req.session.client;
  const category = await Category.find();
  const result = await Test_Themed.find({ theme_THEMED: req.params.id })
  .populate({
    path: "subject_ID", select: "name"
  })
  .populate({
    path: "unit_THEMED", select: "name"
  })
  .populate({
    path: "theme_THEMED", select: "name"
  })
  res.render("./WEBSITE/FREE_test/themed/solution", {
    title: "Mavzu test",
    layout: "./test_layout",
    user, 
    result,category
  });
};



//  Variant testlar olish
exports.solution_test2 = async (req, res, next) => {
  const user = req.session.client;
  const category = await Category.find();
  const result = await Test_Varianted.find({ variant_VARIANTED: req.params.id })
  .populate({
    path: "subject_ID", select: "name"
  })
  .populate({
    path: "unit_VARIANTED", select: "name"
  })
  .populate({
    path: "variant_VARIANTED", select: "name"
  })
  res.render("./WEBSITE/FREE_test/varianted/solution", {
    title: "Variant test",
    layout: "./test_layout",
    user, 
    result,category
  });
};

exports.solution_varianted = async (req, res, next) => {
  const result = await Test_Varianted.find()
  res.send(result)
}
//  Sinflashgan testlar olish
exports.solution_test3 = async (req, res, next) => {
  const user = req.session.client;
  const category = await Category.find();
  const result = await Test_Formed.find({ theme_FORMED: req.params.id })

  .populate({
    path: "subject_ID", select: "name"
  })
  .populate({
    path: "unit_ID_FORMED", select: "name"
  })
  .populate({
    path: "form_ID_FORMED", select: "name"
  })
  .populate({
    path: "theme_ID_FORMED", select: "name"
  })
  res.render("./WEBSITE/FREE_test/formed/solution", {
    title: "Sinf test ",
    layout: "./test_layout",
    user, 
    result,category
  });
};



// ARIZA bilan ishlash uchun uchun
exports.university = async (req, res) => {
  const category = await Category.find();
  const user = req.session.client;
  res.render("./WEBSITE/university", {
    title: "University",
    layout: "./web_layout",
    category, user
  });
}
// exports.ariza = async (req, res) => {
//   res.render("./WEBSITE/ariza", {
//     title: "University",
//     layout: "./test_layout",
//   });
// }
