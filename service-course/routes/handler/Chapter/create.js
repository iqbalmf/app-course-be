const {Chapter} = require('../../../models');
const {Course} = require('../../../models');
const logger = require("../../../logger/logger");
const Validator = require('fastest-validator');

module.exports = async (req, res) => {
  logger.info("Request: ", req.body)
  const schema = {
    name: {type: 'string', nullable: false},
    courseId: {type: 'string', nullable: false},
  };
  const validate = new Validator().validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error', message: validate
    });
  }
  const course = await Course.findByPk(req.body.courseId);
  if (!course){
    logger.error("create_chapter: course not found: ", req.body.courseId)
    return res.status(404).json({
      status: 'error',
      message: 'course not found'
    });
  }
  const chapter = {name: req.body.name, courseId: req.body.courseId};
  const newChapter = await Chapter.create(chapter);
  return res.json({
    status: 'success',
    data: {
      id: newChapter.id
    }
  });

}