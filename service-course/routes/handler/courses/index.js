const createCourse = require('./create');
const getCourses = require('./getCourses')
const getCourse = require('./getCourse')
const updateCourse = require('./update')
const deleteCourse = require('./delete')

module.exports = {
    createCourse,
    getCourse,
    getCourses,
    updateCourse,
    deleteCourse
}