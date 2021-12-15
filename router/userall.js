const express = require('express')
const router = express.Router()
const userall = require('../controller/userall')


const { isAuth, session, roles} = require("../middleware/isAuth");
// session, roles('admin','moderator')

router.post('/add', userall.createOne);
router.post('/stats', userall.natija)
router.get('/all', userall.getAll);
router.get('/:id', userall.getOne);
router.put('/:id', userall.updateOne);
router.delete('/:id', userall.deleteOne);



module.exports = router;