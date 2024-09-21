const createMentor = require('./create')
const updateMentor = require('./update')
const getMentors = require('./getMentors')
const getMentorById = require('./getMentor')
const deleteMentor = require('./delete')

module.exports = {
  createMentor,
  updateMentor,
  getMentors,
  getMentorById,
  deleteMentor
}