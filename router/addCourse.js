const express = require('express');
const router = express.Router();
const addCourse = require('../controller/addCourse');


router.post('/add', addCourse.createOne);
router.get('/all', addCourse.getAll);
router.get('/:id', addCourse.getOne);
router.get('/my_course/:id', addCourse.getMyCourse);
router.get('/material/:id', addCourse.getMaterials);
router.delete('/:id', addCourse.deleteOne);


module.exports = router;       
