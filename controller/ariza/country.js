const Country = require('../../models/ariza/country');

exports.createOne = async (req, res, next) => {
    const result = new Country({
        image: `${req.file.filename}`,
        name: req.body.name,
      });
      result 
        .save()
        .then(() => {
          res.json({ 
            message: "Success",
            data: result,
          });
        })
        .catch((error) => { 
          res.json({ data: error });
        });
}

exports.getAll = async (req, res, next) => {
    const result = await Country.find().sort({ date: -1 });
    res.json(result);
}
exports.getOne = async (req, res, next) => {
    const result = await Country.findById(req.params.id)
  res.json({
    data: result
  }); 
}
exports.delete = async (req, res, next) => {
    await Country.findByIdAndDelete({ _id: req.params.id });
    res.json({
      message: "Success",
      data: [],
    });
}

