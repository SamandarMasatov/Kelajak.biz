const express = require('express');
const router = express.Router()

const section = require('../controller/section')

router.post('/add',section.createOne )
router.get('/all',section.getAll )
router.get('/:id',section.getOne )
router.put('/:id',section.updateOne )
router.delete('/:id',section.deleteOne )


module.exports = router