const {Course, Reviews, MyCourse, Chapter, Lesson, Mentor, ImageCourse} = require('../../../models');
const logger = require('../../../logger/logger');
const getUsers = require('../../../utils/getUsers')
const Sequelize = require('sequelize')
module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    logger.info(`get detail course with id: ${id}`)
    const course = await Course.findByPk(id);
    if (!course) {
      logger.warn(`course not found`)
      return res.status(404).json(
        {
          status: 'error',
          message: 'course not found'
        }
      )
    }
    logger.info('get mentor from course')
    const mentor = await Mentor.findByPk(course.mentorId)
    logger.info('get reviews from course')
    let reviews = await Reviews.findAll({
      where: {
        courseId: id
      }, order: [['createdAt', 'DESC']],
      attributes: ['id', 'rating', 'note', 'userId']
    });
    const userIds = reviews.map(review => review.userId);
    if (userIds.length > 0) {
      req.user_id = userIds; // Set userIds in request object for fetchAllUser
      const users = await getUsers.fetchAllUser(req);

      // Attach user data to reviews
      reviews = reviews.map(review => {
        const user = users.find(u => u.id === review.userId); // Find user by userId
        return {
          ...review.dataValues, // Copy all review properties
          user // Attach user data
        };
      });
    }
    logger.info('get total student from course')
    const totalStudent = await MyCourse.count({
      where: {
        courseId: id
      }
    })
    logger.info('get chapter from course')
    logger.info('get lesson from course')
    const chapters = await Chapter.findAll({
      where: {
        courseId: id
      }, order: [['createdAt', 'DESC']],
      attributes: ['id', 'name', 'courseId'],
      include: [
        {
          model: Lesson,
          as: 'lesson',
        }
      ]

    })
    logger.info('get images_course from course')
    const imageCourse = await ImageCourse.findAll(
      {
        where: {
          courseId: id
        }, order: [['createdAt', 'DESC']]
      }
    )
    logger.info('get total videos from Chapter -> Lesson')
    const totalVideos = chapters.reduce((count, chapter) => count + chapter.lesson.length, 0);

    const response_course = {
      mentor, course, imageCourse, chapters, reviews, totalStudent,
      totalVideos
    }
    return res.json({
      status: 'success',
      data: response_course
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      data: 'internal server error'
    })
  }

}