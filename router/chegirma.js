const express = require('express');
const router = express.Router();
const chegirma = require('../controller/chegirma');

router.post('/create', chegirma.create);
router.get('/all', chegirma.getAll);
router.delete('/:id', chegirma.deleteOne);


module.exports = router;