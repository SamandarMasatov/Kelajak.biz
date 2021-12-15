const Advertisement = require('../models/reklama');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const md5 = require('md5')


exports.createOne = async (req, res, next) => {
    // let compressedFile = path.join(__dirname, '../public/uploads/brand', md5(new Date().getTime()) + '.jpg')
    // await sharp(req.file.path)
    //   .resize(350, 241)
    //   .jpeg({ quality: 100 })
    //   .toFile(compressedFile, (error) => {
    //     if (error) {
    //       res.send(error)
    //     }
    //     fs.unlink(req.file.path, async (error) => {
    //       if (error) {
    //         res.send(error)
    //       }
    //     })
    //   })
    const result = await new Advertisement({
        video: `${ req.file.filename }`
        //image: path.basename(compressedFile)
    });

    await result.save()
    .then(() => {
        res.status(200).json({ success: true, data: result })
    })
    .catch((err) => {
        res.status(400).json({ success: false, data: err })
    })
}

exports.getAll = async (req, res, next) => {
    const result = await Advertisement.find()
    if (!result) {
        res.status(404).json({ success: false, data: 'Result is not found' })
    } 
     res.status(200).json({ success: true, data: result })
};

exports.getOne = async ( req, res, next) => {
    const result = await Advertisement.findById({_id: req.params.id})
    if (!result) {
        res.status(404).json({ success: false, data: 'Result is not found' })
    } 
    res.status(200).json({ success: true, data: result })
};

exports.updateOne = async (req, res, next) => {
    await Advertisement.findByIdAndUpdate({ _id:req.params.id }).exec((error, data) => {
      if (error) { 
          throw error
      } else {
          const filePath = path.join(
              __dirname,
              "../public/uploads/brand/" + data.video
          );
          fs.unlink(filePath, async (err) => {
              if (err) throw err;
          });
      } 
    });
    const result = await Advertisement.findByIdAndUpdate({ _id: req.params.id });
    result.video = `${req.file.filename}`; //path.basename(compressedFile) 
    await result.save()
    .then(() => {
        res.status(200).json({ success: true, data: result })
    })
    .catch((error) => {
        res.status(400).json({ success: false, data: error })
    })
};


exports.deleteOne = async (req, res, next) => {
    await Advertisement.findById({ _id: req.params.id }).exec(async (error, data) => {
      if (error) {
        res.send(error);
      } else {
        const filePath = path.join(
          __dirname,
          "../public/uploads/brand/" + data.video
        ); 
        fs.unlink(filePath, async (err) => {
          if (err) throw err;
          await Advertisement.findByIdAndDelete({ _id: req.params.id });
          res.status(201).json({ success: true, data: 'Deleted' });
        });
      }
    });
  };