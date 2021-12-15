const express = require('express');
const router = express.Router()
const doc = require('../controller/doc')
const multer = require('multer');
const md5 = require('md5');
const path = require('path');


const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, './public/uploads/books')
 },
 filename: function (req, file, cb) {
  cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
 }
})
const upload = multer({ storage: storage })


router.post('/add', upload.single('pdf'), doc.createOne ) 
router.get('/all',doc.getAll )
router.get('/:id',doc.getOne )
router.put('/:id',upload.single('pdf'),doc.updateOne )
router.delete('/:id',doc.deleteOne )


module.exports = router;