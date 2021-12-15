const express = require('express');
const router = express.Router()
const statistic = require('../controller/statistic')


//  foydalamuvchilarning sonini topish
router.get('/users', statistic.users)
    //  yangiliklarning sonini topish
router.get('/news', statistic.news)
    //  jamoa azolaring sonini topish
router.get('/teams', statistic.teams)
    //  brands sonini topish
router.get('/brands', statistic.brands)
    //  sotilgan kurslar sonini topish
router.get('/sold_course', statistic.sold_course)
    //  kurslar sonini topish
router.get('/course', statistic.course)
    // eng yaxshi o'quvchilarni olish barcha ishlagan testlari boyicha
router.get('/best', statistic.best_make_test_human)
    // 1 hafta, 1 oy, 3 oy, 6 oy, 1 yillik boyicha eng zor foydalanuvchilarni topish
router.get('/one_week', statistic.filter_by_One_Week)
router.get('/one_month', statistic.filter_by_One_Month)
router.get('/three_month', statistic.filter_by_Three_Month)
router.get('/six_month', statistic.filter_by_Six_Month)
router.get('/one_year', statistic.filter_by_One_Year)
    // Har bir test yechgan foydalanuvchi Test yechganlar orasida o’zi yechgan fan bo’yicha nechanchi o’rinda ekanligini birdan kurish imkonyati
router.get('/filter_by_Free_Subject', statistic.filter_by_Free_Subject)






// 1 kunlik, 1  haftalik 1 oylik, 3 oylik, boyicha sotilgan kurslar ro'yhatini shakllantirish
router.get('/sold_course', statistic.sold_course_ALL)
    // Umumiy kurslar soni
router.get('/countCourse', statistic.countCourse)
    // Umumiy sotilgan kurslar
router.get('/countSoldCouse', statistic.countSoldCouse)
    //  Har bir fan boyicha nechta testlar qoshilganini larni chiqarish
router.get('/materialOfFreeSubjects', statistic.materialOfFreeSubjects)
    //  Har bir kurslar bo'yicha testlar, audiolar, videolar, pdf larni chiqarish
router.get('/materialOfSellingSubjects', statistic.materialOfSellingSubjects)








module.exports = router;