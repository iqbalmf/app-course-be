const createLesson = require('./create');
const getLessons = require('./getLessons')
const getLesson = require('./getLesson')
const updateLesson = require('./update')
const deleteLesson = require('./delete')

module.exports = {
  createLesson,
  getLesson,
  getLessons,
  updateLesson,
  deleteLesson
}