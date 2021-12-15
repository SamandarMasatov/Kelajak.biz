const express = require('express');
const router = express.Router()
const test = require('../controller/test')

router.post('/add', test.createOne) 
router.get('/all', test.getAll)
router.get('/:id', test.getOne)
router.get('/info/:id', test.getInfo)
router.put('/:id', test.updateInfo)
router.delete('/:id', test.deleteOne)


module.exports = router