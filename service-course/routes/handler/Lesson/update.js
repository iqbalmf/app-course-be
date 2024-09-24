const {Lesson} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const logger = require('../../../logger/logger')

module.exports = async (req, res) => {
  const id = req.params.id;
  const schema = {
    name: {type: 'string', nullable: false},
    video: {type: 'string', optional: true},
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    logger.error("validate: ", validate)
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }

  const lesson = await Lesson.findByPk(id);
  if (!lesson){
    logger.error("error get data lesson")
    return res.status(404).json({
      status: 'error',
      message: 'lesson not found'
    })
  }
  logger.info("update data lesson")
  let updateLesson = {
    name: req.body.name,
    video: req.body.video,
  }

  updateLesson = await lesson.update(updateLesson);
  return res.json({
    status: 'success',
    data: {
      id: updateLesson.id,
      name: updateLesson.name,
      video: updateLesson.video,
      courseId: updateLesson.courseId,
      updatedAt: updateLesson.updatedAt,
    }
  })
}