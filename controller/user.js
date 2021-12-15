const User = require("../models/user");
const { result_blocked } = require("./result");


//  Admin registratsiyasi uchun
exports.register = async (req, res) => { 
  let code = "";
  function makeid(length) {
    let characters = "0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code
  }
  makeid(20);
  let users = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    uid: code
  })
  await users.save()
    .then(() => {
      res.redirect('/')
    })
    .catch((error) => {
      res.status(400).json({ success: true, data: error });
    })

};

// Admin/moderator ga avtorizatsiya qilish
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.redirect("/");
  }
  const users = await User.findOne({ email: email }).select("password");
  if (!users) {
    res.redirect("/");
  }
  const isMatch = await users.matchPassword(password);
  if (!isMatch) {
    res.redirect("/");
  }
  const body = await User.findOne({ email: req.body.email });
  await body.save({ validateBeforeSave: false })
  req.session.client = body
  req.session.save()
  res.redirect('/')
};
exports.logout = async (req, res, next) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/");
};
exports.me = async (req, res, next) => {
  const result = req.session
  res.json(result)
};


exports.updateOne = async (req, res, next) => {
  const result = await User.findByIdAndUpdate(req.params.id)
  result.name = req.body.name;
  result.email = req.body.email;
  result.password = req.body.password;

  result.save()
    .then(() => {
      res.json(result)
    })
    .catch((error) => {
      res.status(400).json({ success: true, data: error });
    })
};





