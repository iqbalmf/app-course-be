const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')

const mentorHandler = require('./handler/mentor')
const courseHandler = require('./handler/course')
const chapterHandler = require('./handler/chapter')
const lessonHandler = require('./handler/lesson')
const imagesHandler = require('./handler/images')
const myCourseHandler = require('./handler/my-course')
const reviewHandler = require('./handler/review')

router.post('/mentor', verifyToken, mentorHandler.create)
router.get('/mentor', verifyToken, mentorHandler.getAll)
router.get('/mentor/:id', verifyToken, mentorHandler.getById)
router.put('/mentor/:id', verifyToken, mentorHandler.update)
router.delete('/mentor/:id', verifyToken, mentorHandler.destroy)

router.post('/chapter', verifyToken, chapterHandler.create)
router.get('/chapter', verifyToken, chapterHandler.getAll)
router.get('/chapter/:id', verifyToken, chapterHandler.getById)
router.put('/chapter/:id', verifyToken, chapterHandler.update)
router.delete('/chapter/:id', verifyToken, chapterHandler.destroy)

router.post('/lesson', verifyToken, lessonHandler.create)
router.get('/lesson', verifyToken, lessonHandler.getAll)
router.get('/lesson/:id', verifyToken, lessonHandler.getById)
router.put('/lesson/:id', verifyToken, lessonHandler.update)
router.delete('/lesson/:id', verifyToken, lessonHandler.destroy)

router.post('/images', verifyToken, imagesHandler.create)
router.get('/images', verifyToken, imagesHandler.getAll)
router.get('/images/:id', verifyToken, imagesHandler.getById)
router.put('/images/:id', verifyToken, imagesHandler.update)
router.delete('/images/:id', verifyToken, imagesHandler.destroy)

router.post('/my-course', verifyToken, myCourseHandler.create)
router.get('/my-course', verifyToken, myCourseHandler.getAll)
router.get('/my-course/:id', verifyToken, myCourseHandler.getById)
router.delete('/my-course/:id', verifyToken, myCourseHandler.destroy)

router.post('/review', verifyToken, reviewHandler.create)
router.put('/review/:id', verifyToken, reviewHandler.update)
router.delete('/review/:id', verifyToken, reviewHandler.destroy)

router.post('/', verifyToken, courseHandler.create)
router.get('/', courseHandler.getAll)
router.get('/:id', courseHandler.getById)
router.put('/:id', verifyToken, courseHandler.update)
router.delete('/:id', verifyToken, courseHandler.destroy)

module.exports = router;
