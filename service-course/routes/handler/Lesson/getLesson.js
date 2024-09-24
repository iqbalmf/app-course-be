const {Lesson} = require('../../../models');
const logger = require('../../../logger/logger');
module.exports = async (req, res) => {
  const id = req.params.id;
  logger.info("find lesson id :", id)
  const lesson = await Lesson.findByPk(id);
  if (!lesson) {
    return res.status(404).json(
      {
        status: 'error',
        message: 'lesson not found'
      }
    )
  }
  return res.json({
    status: 'success',
    data: lesson
  })
}