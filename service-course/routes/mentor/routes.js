const express = require('express');
const router = express.Router();

const MentorController = require('../../controller/courses.controller');

router.post('/mentors', MentorController.createMentor);
// router.put('/mentors/:id', MentorController.updateMentor)
// router.get('/mentors/:id', MentorController.getMentorById)
router.get('/mentors', MentorController.getAllMentor)
// router.delete('/mentors/:id', MentorController.deleteMentor)

module.exports = router;