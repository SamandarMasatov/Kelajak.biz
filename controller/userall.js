const User = require("../models/user");


exports.createOne = async (req, res, next) => {
  const result = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  });
  result
    .save()
    .then(() => {
      res.redirect("/userall/all");
    })
    .catch((error) => {
      res.status(400).json({ success: true, data: error });
    });
};


exports.getAll = async (req, res) => {
  const result = await User.find({ role:  'user'  })
  res.render('./userall/index', {
  title: "Kelajak.uz", 
  layout: "./layout",
  result,
});
};


exports.getOne = async (req, res) => {
  const result = await User.findById(req.params.id);
  const user = req.session.user;
  res.render("./userall/update", {
    title: "Kelejak.uz",
    layout: "./layout",
    user,
    result,
  });
};


exports.updateOne = (req, res, next) => {
   User.findByIdAndUpdate(  req.params.id, req.body )
    .exec(async (error, result) => {
      if (error) return res.json({error, success: false})
        res.redirect('./all')
    })
};

exports.deleteOne = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect("/userall/all");
};


exports.natija = async (req, res) => {
  const start = req.body.start
  const end = req.body.end
  await User.aggregate([
      // {$match: {createdAt: {$gte: new Date(start),$lte: new Date(end)}}},
      {
          $group: {
              _id: "$user_ID",
              total: { $sum: "$totalQuestion" }
          }
      },
      {
          $lookup: {
              from: 'users',
              //localField: '_id',
              //foreignField: '_id',
              let: { 'id': '$_id' },
              pipeline: [
                  { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
                  {
                      $project: {
                          _id: 0,
                          name: 1,
                          uid: 1
                      }
                  }
              ],
              as: 'user'
          }
      },
      
      {
          $project: {
              _id: 0,
              total: 1,
              user: 1
          }
      }
  ]).exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true, data })
  })
};