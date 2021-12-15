const express = require('express');
const router = express.Router();
const brand = require('../controller/brand');
const path = require('path');
const md5 = require('md5');
const multer = require('multer'); 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/brand')
    },
    filename: function (req, file, cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage: storage});

router.post('/add', upload.single('image'), brand.createOne);
router.get('/all', brand.getAll);
router.get('/:id', brand.getOne);
router.put('/:id', brand.updateInfo)
router.put('/update/:id', upload.single('image'), brand.updateOne)
router.delete('/:id', brand.deleteOne);

module.exports = router;