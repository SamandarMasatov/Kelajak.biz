const express = require('express');
const router = express.Router()
const result  = require('../controller/result')


router.post('/selling', result.result_selling)
router.post('/themed', result.result_themed)
router.post('/varianted', result.result_varianted)
router.post('/formed', result.result_formed)
router.post('/blocked', result.result_blocked)



module.exports = router;