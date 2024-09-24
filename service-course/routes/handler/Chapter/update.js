const {Chapter} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const logger = require('../../../logger/logger')

module.exports = async (req, res) => {
  const id = req.params.id;
  const schema = {
    name: {type: 'string', nullable: false},
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    logger.error("validate: ", validate)
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }

  const chapter = await Chapter.findByPk(id);
  if (!chapter) {
    logger.error("chapter not found")
    return res.status(404).json({
      status: 'error',
      message: 'course not found'
    })
  }
  logger.info("update data chapter")
  let updateChapter = {
    name: req.body.name
  }
  updateChapter = await chapter.update(updateChapter)
  return res.json({
    status: 'success',
    data: {
      id: updateChapter.id,
      name: updateChapter.name,
      courseId: updateChapter.courseId
    }
  })
}