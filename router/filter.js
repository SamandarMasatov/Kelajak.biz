const express = require('express');
const router = express.Router()
const filter = require('../controller/filter')

router.get('/filter_course_of_category/:id', filter.filterCourseCategory)
router.get('/filter_section_of_course/:id', filter.filterThemeCourse)
router.get('/filter_theme_of_course/:id', filter.filterCourseTheme)
router.get('/filter_collection_of_section/:id', filter.filterSectionCollection)
router.get('/filter_BY_date', filter.filter_StartDate_EndDate)
 

module.exports = router
