const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')

const mediaHandler = require('./handler/media');
router.get('/', verifyToken, mediaHandler.getAll);
router.post('/', verifyToken, mediaHandler.create);
router.delete('/:id', verifyToken, mediaHandler.deleteById);


module.exports = router;
