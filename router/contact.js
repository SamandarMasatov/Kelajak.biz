const express = require('express');
const router = express.Router();
const contact = require('../controller/contact');


router.post('/add', contact.createOne);
router.get('/all', contact.getAll); // unseen list
router.get('/seen', contact.seenList); // seen list
router.get('/make/:id', contact.makeSeen);
router.get('/info/:id', contact.getOne);
router.get('/get_course/:id', contact.getcourse);
router.delete('/:id', contact.deleteOne);

module.exports = router;