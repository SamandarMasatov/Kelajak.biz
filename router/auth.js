const express = require('express')
const router = express.Router()
const auth = require('../controller/auth')
 
// MIDDLEWARE

const { isAuth, session, roles} = require("../middleware/isAuth");
// session, roles('admin','moderator')


router.post('/register', auth.register) // admin register
router.post('/moderator',   auth.moderatorCreate) // moderator regsiter
router.post('/login',  auth.login) 
router.get('/logout',  auth.logout) 
router.get('/all',  auth.getModerators) 
router.get('/allUser',  auth.getAll)  
router.get('/:id',  auth.getModerator) 
router.put('/:id',  auth.updateModerator) 
router.delete('/:id',  auth.deleteOne) 


module.exports = router