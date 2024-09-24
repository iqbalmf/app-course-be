const { ImageCourse } = require('../../../models');
const logger = require('../../../logger/logger');
module.exports = async (req, res) => {
  const id = req.params.id;
  logger.info("checking lesson id: ", id);
  const chapter = await ImageCourse.findByPk(id);
  if (!chapter) {
    return res.status(404).json({
      status: 'error',
      message: 'ImageCourse not found'
    })
  }
  await chapter.destroy();
  return res.json({
    status: 'success',
    message: 'ImageCourse deleted'
  })
}