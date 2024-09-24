const express = require('express');
const router = express.Router();
const mentorHandler = require('./handler/mentors');
const coursesHandler = require('./handler/courses');
const chapterHandler = require('./handler/Chapter');
const lessonHandler = require('./handler/Lesson');
const imageCourseHandler = require('./handler/ImageCourse');
const myCourseHandler = require('./handler/MyCourse');

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

router.post('/chapter', chapterHandler.createChapter);
router.get('/chapter/:id', chapterHandler.getChapter);
router.get('/chapter', chapterHandler.getChapters);
router.put('/chapter/:id', chapterHandler.updateChapter);
router.delete('/chapter/:id', chapterHandler.deleteChapter);

router.post('/images', imageCourseHandler.createImage);
router.get('/images/:id', imageCourseHandler.getImage);
router.get('/images', imageCourseHandler.getImages);
router.put('/images/:id', imageCourseHandler.updateImage);
router.delete('/images/:id', imageCourseHandler.deleteImage);

router.post('/my-course', myCourseHandler.createMyCourse);
router.get('/my-course/:id', myCourseHandler.getMyCourse);
router.get('/my-course', myCourseHandler.getMyCourses);
router.delete('/my-course/:id', myCourseHandler.deleteMyCourse);

router.post('/lesson', lessonHandler.createLesson);
router.get('/lesson/:id', lessonHandler.getLesson);
router.get('/lesson', lessonHandler.getLessons);
router.put('/lesson/:id', lessonHandler.updateLesson);
router.delete('/lesson/:id', lessonHandler.deleteLesson);


module.exports = router;
