const express = require('express');
const router = express.Router();
const advertisement = require('../controller/reklama')
const multer = require('multer');
const md5 = require('md5');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     cb(null, './public/uploads/brand')
    },
    filename: function (req, file, cb) {
     cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    }
   })

const upload = multer({ storage: storage });

router.post('/add', upload.single('video'), advertisement.createOne)
router.get('/all', advertisement.getAll)
router.get('/:id', advertisement.getOne)
router.put('/update/:id', upload.single('video'), advertisement.updateOne)
router.delete('/:id', advertisement.deleteOne);

module.exports = router;