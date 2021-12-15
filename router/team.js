const express = require('express');
const router = express.Router();
const team = require('../controller/team')
const md5 =require ("md5")
const multer = require("multer");
const path = require("path");


const storage= multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/team')
    },
    filename: function (req, file, cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage});


router.post('/add', upload.single("image"), team.createOne); 
router.get('/all', team.getAll)
router.get('/:id', team.getOne)
router.delete('/:id', team.deleteOne);
router.get('/info/:id', team.getInfo);
router.put('/:id', team.updateInfo)
router.put('/update/:id', upload.single("image"), team.updateOne); 


module.exports = router;



