const express = require('express');
const router = express.Router()

const collection = require('../controller/test_collection')

router.post('/add',collection.createOne )
router.get('/all',collection.getAll )
router.get('/:id',collection.getOne )
router.put('/:id',collection.updateOne )
router.delete('/:id',collection.deleteOne )


module.exports = router