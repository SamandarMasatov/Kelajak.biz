const express = require('express')
const router = express.Router()
const moderator = require('../controller/moderator');
const path = require('path');
const md5 = require('md5');
const multer = require('multer');


const { isAuth, session, roles } = require("../middleware/isAuth");
// session, roles('admin','moderator');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/moderator')
    },
    filename: function(req, file, cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), moderator.createOne);
router.post('/login', moderator.login);
router.get('/all', moderator.getAll);
router.get('/:id', moderator.getOne);
router.put('/:id', moderator.updateInfo);
router.put('/update/:id', upload.single('image'), moderator.updateOne);
router.delete('/:id', moderator.deleteOne);


module.exports = router;