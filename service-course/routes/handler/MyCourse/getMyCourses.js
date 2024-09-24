const {MyCourse, Course} = require('../../../models');
const logger = require('../../../logger/logger');

module.exports = async (req, res) => {
  try {
    const myCourses = await MyCourse.findAll(
      {
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'userId', 'courseId'],
      },
    );
    const courseIds = myCourses.map(myCourse => myCourse.courseId);
    const courses = await Course.findAll({
      where: { id: courseIds },
      attributes: [
        'id', 'name', 'certificate', 'thumbnail', 'type',
        'status', 'price', 'level', 'description',
        'mentor_id', 'created_at', 'updated_at'
      ]
    });

    const courseMap = {};
    courses.forEach(course => {
      courseMap[course.id] = course;
    });

    const responseData = myCourses.map(myCourse => ({
      id: myCourse.id,
      courseId: myCourse.courseId,
      userId: myCourse.userId,
      course: courseMap[myCourse.courseId] || []
    }));

    return res.json({
      status: 'success',
      data: responseData
    })
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching MyCourse.'
    })
  }
}