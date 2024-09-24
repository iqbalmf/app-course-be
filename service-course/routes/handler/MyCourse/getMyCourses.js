const {MyCourse, Course} = require('../../../models');
const logger = require('../../../logger/logger');

module.exports = async (req, res) => {
  try {
    const myCourse = await MyCourse.findAll(
      {
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'userId', 'courseId'],
        include: [
          {
            model: Course,
            as: 'course',
            attributes: [
              'id', 'name', 'certificate', 'thumbnail',
              'type', 'status', 'price', 'level', 'description',
              'mentorId'
            ]
          }
        ],
      },
    );

    return res.json({
      status: 'success',
      data: myCourse.map(mc => ({
        id: mc.id,
        course_id: mc.courseId,
        user_id: mc.userId,
        course: mc.course ? {
          id: mc.course.id,
          name: mc.course.name,
          certificate: mc.course.certificate,
          thumbnail: mc.course.thumbnail,
          type: mc.course.type,
          status: mc.course.status,
          price: mc.course.price,
          level: mc.course.level,
          description: mc.course.description,
          mentorId: mc.course.mentorId,
          created_at: mc.course.created_at,
          updated_at: mc.course.updated_at
        } : null
      }))
    })
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching MyCourse.'
    })
  }
}