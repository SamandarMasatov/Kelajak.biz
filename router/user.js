const express = require('express')
const router = express.Router()
const user = require('../controller/user')


const { isAuth, session, roles} = require("../middleware/isAuth");
// session, roles('admin','moderator')

router.post('/register', user.register)
router.post('/login', user.login)
router.get('/logout', user.logout)
router.get('/me', user.me)
router.put('/:id', user.updateOne) 



module.exports = router;