const User = require("../models/user");
const ObjectId = require("mongodb").ObjectID;
//  Admin registrtsiyasi uchun
exports.register = async (req, res, next) => {
  let code = "";
  function makeid(length) { 
    let characters = "0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code;
  }
  makeid(20);
  const result = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    uid: code,
  });
  result
    .save()
    .then(() => {
      res.status(201).json({ data: result });
    })
    .catch((error) => {
      res.status(400).json({ data: error });
    });
};
exports.getAll = async (req, res, next) => {
  await User.aggregate([
    {
      $match: { role: { $eq: "admin" } },
    },
  ]).exec((error, result) => {
    if (error) throw error
    else {
      res.status(200).json({
        result,
      });
    }
  });
}

//  Moderator registrtsiyasi uchun
exports.moderatorCreate = async (req, res, next) => {
  let code = "";
  function makeid(length) {
    let characters = "0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code;
  }
  makeid(20);
  const result = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    uid: code,
  });
  result
    .save()
    .then(() => {
      res.status(201).json({ data: result });
    })
    .catch((error) => {
      res.status(400).json({ data: error });
    });
};

// Admin/moderator ga avtorizatsiya qilish
exports.login = async (req, res, next) => {
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
  if (body.role == "user") {
    res.redirect("/admin/login");
    req.session.isAuth = false;
  } else if (body.role == "admin" || body.role == "moderator") {
    req.session.user = body;
    req.session.isAuth = true;
    req.session.save();
    res.redirect("/admin/dashboard");
  }


};
//  Admin page dan chiqish
exports.logout = async (req, res, next) => {
  req.session.destroy();
  res.clearCookie("connect.sid"); 
  res.clearCookie("_csrf");
  res.redirect("/admin/login");
};


// moderatorlarni olish
exports.getModerators = async (req, res, next) => {
  await User.aggregate([
    {
      $match: { role: { $eq: "moderator" } },
    },
  ]).exec((error, result) => {
    if (error) throw error
    else {
      res.status(200).json({
        result,
      });
    }
  });
};
// moderatorni olish
exports.getModerator = async (req, res, next) => {
  await User.aggregate([
    {
      $match: {
        _id: new ObjectId(req.params.id),
      },
    },
  ]).exec((error, result) => {
    if (error) throw error
    else {
      res.status(200).json({
        result,
      });
    }
  });
};
// moderatorni tahrilash
exports.updateModerator = async (req, res, next) => {
  await User.findOneAndUpdate(req.params.id)
    .exec(async (error, result) => {
      if (error) throw error
      else {

        result.name = req.body.name
        result.email = req.body.email
        result.password = req.body.password
        await result.save()
          .then(() => {
            res.json(result)
          })
          .catch((err) => {
            res.json(err)
          })
      }
    })
};

exports.deleteOne = async (req, res, next) => {
  await User.findByIdAndDelete({ _id: req.params.id })
  res.json({
    message: "User is deleted"
  })
};