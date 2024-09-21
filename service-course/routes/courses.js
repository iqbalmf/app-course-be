const express = require('express');
const router = express.Router();
const mentorHandler = require('./handler/mentors');

router.post('/mentors', mentorHandler.createMentor);
router.put('/mentors/:id', mentorHandler.updateMentor)
router.get('/mentors/:id', mentorHandler.getMentorById)
router.get('/mentors', mentorHandler.getMentors)
router.delete('/mentors/:id', mentorHandler.deleteMentor)
module.exports = router;
