const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/admin/login");
  }
};

const isAuth_USER = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/");
  }
};



const session = (req, res, next) => {
  if (!req.session) {
    res
      // .status(401)
      // .json({ data: "Bu ma'lumotni olish uchun avtorizatsiyadan o'ting 2" });
    res.redirect('/admin/login')
  }
  next();
};

// admin / moderator roli uchun
const roles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.session.user.role)) {
      // res.status(401).json({ data: "Bu ma'lumotni olish uchun avtorizatsiyadan o'ting 3" });
      res.redirect('/admin/login')
    }
    next();
  };
};
//  user role uchun
const client_role = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.session.client.role)) {
      // res.status(401).json({ data: "Bu ma'lumotni olish uchun avtorizatsiyadan o'ting 3" });
      res.redirect('/admin/login')
    }
    next();
  };
};

module.exports = { isAuth, isAuth_USER,roles, session, client_role };
