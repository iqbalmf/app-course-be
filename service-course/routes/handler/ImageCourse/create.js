const { ImageCourse, Course } = require("../../../models")
const logger = require("../../../logger/logger");
const Validator = require('fastest-validator');

module.exports = async (req, res) => {
  logger.info("Request: ", req.body)
  const schema = {
    image: {type: 'string', nullable: false},
    courseId: {type: 'string', nullable: false},
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
  const imageCourse = {image: req.body.image, courseId: course.id};
  const createImage = await ImageCourse.create(imageCourse);
  return res.json({
    status: 'success',
    data: {
      id: createImage.id,
    }
  })

}