const express = require('express');
const router = express.Router();
const mentorHandler = require('./handler/mentors');
const coursesHandler = require('./handler/courses');

router.post('/mentors', mentorHandler.createMentor);
router.put('/mentors/:id', mentorHandler.updateMentor)
router.get('/mentors/:id', mentorHandler.getMentorById)
router.get('/mentors', mentorHandler.getMentors)
router.delete('/mentors/:id', mentorHandler.deleteMentor)

router.post('/courses', coursesHandler.createCourse);
router.get('/courses/:id', coursesHandler.getCourse);
router.get('/courses', coursesHandler.getCourses);
router.put('/courses/:id', coursesHandler.updateCourse);
router.delete('/courses/:id', coursesHandler.deleteCourse);


module.exports = router;
