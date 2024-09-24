const { Lesson } = require('../../../models');
const logger = require('../../../logger/logger');
module.exports = async (req, res) => {
  const id = req.params.id;
  logger.info("checking lesson id: ", id);
  const chapter = await Lesson.findByPk(id);
  if (!chapter) {
    return res.status(404).json({
      status: 'error',
      message: 'lesson not found'
    })
  }
  await chapter.destroy();
  return res.json({
    status: 'success',
    message: 'lesson deleted'
  })
}