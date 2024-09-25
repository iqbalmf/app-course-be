const { MyCourse, Course } = require("../../../models")
const logger = require("../../../logger/logger");
const Validator = require('fastest-validator');
const apiAdapter = require('../../../utils/apiAdapter');
const api = apiAdapter(process.env.URL_SERVICE_USER);

module.exports = async (req, res) => {
  logger.info("Request: ", req.body)
  const schema = {
    courseId: {type: 'string', nullable: false},
    userId: {type: 'string', nullable: false},
  };
  const validate = new Validator().validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error', message: validate
    });
  }
  const course = await Course.findByPk(req.body.courseId);
  if (!course) {
    logger.error("course not found: ", req.body.courseId)
    return res.status(404).json({
      status: 'error',
      message: 'course not found'
    });
  }
  let userData;
  try {
    userData = await api.get(`/users/${req.body.userId}`);
    logger.info("Fetched user data from service-user: ", userData.data.data);
  } catch (error) {
    logger.error("Failed to fetch user from service-user: ", error.message);
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        status: 'error',
        message: 'service-user unavailable',
      });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }

  if (!userData.data.data){
    logger.error("user not found: ", req.body.userId)
    return res.status(404).json({
      status: 'error',
      message: 'user not found'
    });
  }

  const isExistMyCourse = await MyCourse.findOne({
    where: {
      course_id: course.id,
      user_id: userData.data.data.id
    }
  });
  if (isExistMyCourse){
    logger.error("user already taken this course: ", req.body.userId)
    return res.status(404).json({
      status: 'error',
      message: `user already taken this course`
    });
  }

  const myCourse = {courseId: course.id, userId: userData.data.data.id.toString()};
  const createMyCourse = await MyCourse.create(myCourse);
  return res.json({
    status: 'success',
    data: {
      id: createMyCourse.id,
      courseId: createMyCourse.courseId,
      userId: createMyCourse.userId,
    }
  })

}