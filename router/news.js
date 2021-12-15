const express = require('express');
const router = express.Router();
const news = require('../controller/news')
const md5 =require ("md5")
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/news')
    },
    filename: function (req, file, cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage});

router.post('/add', upload.single("image"), news.createOne);
router.get('/all', news.getAll);
router.get('/:id', news.getOne);
router.delete('/:id', news.deleteOne);
router.get('/info/:id', news.getInfo)
//router.get('/info/:id', news.updateInfo);
router.put('/:id', news.updateInfo); 
router.put('/update/:id', upload.single("image"), news.UpdateOne);


module.exports = router;