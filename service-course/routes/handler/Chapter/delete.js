const { Chapter } = require('../../../models');
const logger = require('../../../logger/logger');
module.exports = async (req, res) => {
  const id = req.params.id;
  logger.info("checking chapter id: ", id);
  const chapter = await Chapter.findByPk(id);
  if (!chapter) {
    return res.status(404).json({
      status: 'error',
      message: 'course not found'
    })
  }
  await chapter.destroy();
  return res.json({
    status: 'success',
    message: 'course deleted'
  })
}