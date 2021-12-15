const express = require('express');
const router = express.Router()
const buy =  require('../controller/buy_course')

// Middleware
const {session, client_role} = require("../middleware/isAuth");

// foydalanuvchi yangi kurs sotib oladi
router.post('/create', buy.createOne)

/*
1.foydalanuvchi kurs sotib oladi
2.sotib olgan kurslari boyicha materiallardan foydalanish huquqiga ega biladi
*/
router.get('/mycource/:id', buy.getMyCourse)
router.get('/watch/:id',session, client_role('user'), buy.watchSoldVideo)

module.exports = router;