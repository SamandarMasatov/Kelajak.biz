const express = require('express');
const router = express.Router()
const balance =  require('../controller/balance')

// foydalanuvchi o'zining balansini to'ldirish uchun
router.post('/fill/:uid', balance.fill_balance)

module.exports = router