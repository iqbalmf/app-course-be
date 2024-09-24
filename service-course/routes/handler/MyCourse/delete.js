const { MyCourse } = require('../../../models');
const logger = require('../../../logger/logger');
module.exports = async (req, res) => {
  const id = req.params.id;
  logger.info("checking MyCourse id: ", id);
  const chapter = await MyCourse.findByPk(id);
  if (!chapter) {
    return res.status(404).json({
      status: 'error',
      message: 'MyCourse not found'
    })
  }
  await chapter.destroy();
  return res.json({
    status: 'success',
    message: 'MyCourse deleted'
  })
}