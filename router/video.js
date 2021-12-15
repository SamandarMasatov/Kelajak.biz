const express = require('express');
const router = express.Router()
const multer = require('multer');
const md5 = require('md5');
const path = require('path');
const video = require('../controller/video');

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, './public/uploads/video')
 },
 filename: function (req, file, cb) {
  cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
 }
})
const upload = multer({ storage: storage })

router.post('/add',upload.single('video'),video.createOne )
router.get('/all',video.getAll )
router.get('/:id',video.getOne )
router.get('/info/:id',video.getInfo )
router.put('/info/:id',video.updateInfo )
router.put('/video/:id',upload.single('video'),video.updateVideo )
router.delete('/:id',video.deleteOne )

module.exports = router