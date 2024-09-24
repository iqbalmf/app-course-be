const {MyCourse, Course} = require('../../../models');
const logger = require('../../../logger/logger');
module.exports = async (req, res) => {
  const id = req.params.id;
  logger.info("find my course id :", id)
  const myCourse = await MyCourse.findByPk(id);
  if (!myCourse) {
    return res.status(404).json(
      {
        status: 'error',
        message: 'my course not found'
      }
    )
  }
  const course = await Course.findByPk(myCourse.courseId)
  const response = {
    id: myCourse.id,
    userId: myCourse.userId,
    courseId: myCourse.courseId,
    course: course
  }
  return res.json({
    status: 'success',
    data: response
  })
}