const express = require('express')
const router = express.Router()
const admin = require('../../controller/admin/index')
// middleware
const { isAuth, session, roles } = require('../../middleware/isAuth')


router.get('/login', admin.login)
router.get('/dashboard', isAuth, session, roles('admin', 'moderator'), admin.dashboard)
router.get('/test', admin.test)
router.get('/themed', admin.mavzulashgan)
router.get('/varianted', admin.variantlashgan)
router.get('/formed', admin.sinflashgan)
router.get('/blocked', admin.bloklashgan)

router.get('/universitet', admin.universitet)
router.get('/yonalish', admin.yonalish)
router.get('/ariza', admin.ariza)
router.get('/davlat', admin.davlat)
router.get('/video', admin.video)
router.get('/profile', admin.profile)

module.exports = router;