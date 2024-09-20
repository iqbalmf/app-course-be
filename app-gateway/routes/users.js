const express = require('express');
const router = express.Router();

const usersHandler = require('./handler/users');
const verifyToken = require('../middleware/verifyToken')

router.post('/register', usersHandler.register);
router.post('/login', usersHandler.login)
router.put('/', verifyToken, usersHandler.update)
router.get('/detail', verifyToken, usersHandler.getUser)
router.get('/', verifyToken, usersHandler.getUsers)
router.post('/logout', verifyToken, usersHandler.logout)

module.exports = router;
