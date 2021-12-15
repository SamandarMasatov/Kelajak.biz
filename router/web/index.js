const express = require('express');
const router = express.Router();
const website = require('../../controller/web/index')

router.get('/', website.home)

router.get('/course', website.courses)     
router.get('/info', website.info)
router.get('/one_course', website.one_course)  
router.get('/watch_video', website.watch_video) 
router.get('/all_course', website.getAll_COURSE) // getAll_COURSE
router.get('/all_result', website.getAll_RESULT) // getAll_RESULT
router.get('/test_courseAll', website.test_Course_All)

// Bepul testlar bolimlari va ularni filtrlash
router.get('/free_test', website.get_Free_test) 
router.get('/themed', website.themed) 
router.get('/formed', website.formed) 
router.get('/blocked', website.blocked) 
router.get('/varianted', website.varianted) 
router.get('/subject', website.getAllSubjects)  
router.get('/solution_varianted', website.solution_varianted)  
// Bepul testlar bolimlari va filtrlangan bolimlarning testlarini olish
router.get('/test_solution/:id', website.solution_test) // mavzulashgan testlar olish uchun
router.get('/solution_test2/:id', website.solution_test2) // variant testlar olish uchun
router.get('/solution_test3/:id', website.solution_test3) // sinfgao oid testlar olish uchun

 



// mening kurslarin bolimiga kirish
router.get('/test_course/:id', website.test_course) 
router.get('/pdf_course/:id', website.pdf_course) 
router.get('/profile_kurs/:id', website.profile_kurs_ENTER) 
router.get('/profile_result/:id', website.profile_result_ENTER) 

// Chet elda ta'lim
router.get('/university', website.university) 
// router.get('/ariza/:id', website.ariza)

module.exports = router