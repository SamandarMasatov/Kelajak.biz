const express = require('express');
const router = express.Router();
const mainvideo = require('../controller/mainvideo');
const multer = require('multer');
const md5 = require('md5');
const path = require('path');

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, './public/uploads/video')
 },
 filename: function (req, file, cb) {
  cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
 }
})
const upload = multer({ storage: storage });


router.post('/add', upload.single('video'), mainvideo.createOne);
router.get('/all', mainvideo.getAll);
router.delete('/:id', mainvideo.deleteOne);


module.exports = router;
