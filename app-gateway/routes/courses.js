const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')

const mentorHandler = require('./handler/mentor')
const courseHandler = require('./handler/course')

router.post('/mentor', verifyToken, mentorHandler.create)
router.get('/mentor', verifyToken, mentorHandler.getAll)
router.get('/mentor/:id', verifyToken, mentorHandler.getById)
router.put('/mentor/:id', mentorHandler.update)
router.delete('/mentor/:id', mentorHandler.destroy)
//
// router.post('/', courseHandler.create)
// router.get('/', courseHandler.getAll)
// router.get('/:id', courseHandler.getById)
// router.put('/:id', courseHandler.update)
// router.delete('/:id', courseHandler.destroy)

module.exports = router;
