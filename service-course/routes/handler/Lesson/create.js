const {Lesson} = require('../../../models');
const {Chapter} = require('../../../models');
const logger = require("../../../logger/logger");
const Validator = require('fastest-validator');

module.exports = async (req, res) => {
  logger.info("Request: ", req.body)
  const schema = {
    name: {type: 'string', nullable: false},
    video: {type: 'string', nullable: false},
    chapterId: {type: 'string', nullable: false},
  };
  const validate = new Validator().validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error', message: validate
    });
  }
  const chapter = await Chapter.findByPk(req.body.chapterId);
  if (!chapter) {
    logger.error("create_lesson: chapter not found: ", req.body.chapterId)
    return res.status(404).json({
      status: 'error',
      message: 'chapter not found'
    });
  }
  const lesson = {name: req.body.name, video: req.body.video, chapterId: chapter.id};
  const createLesson = await Lesson.create(lesson);
  return res.json({
    status: 'success',
    data: {
      id: createLesson.id,
    }
  })

}