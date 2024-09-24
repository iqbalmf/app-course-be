const createChapter = require('./create');
const getChapters = require('./getChapters')
const getChapter = require('./getChapter')
const updateChapter = require('./update')
const deleteChapter = require('./delete')

module.exports = {
  createChapter,
  getChapter,
  getChapters,
  updateChapter,
  deleteChapter
}