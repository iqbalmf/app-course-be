const {Chapter} = require('../../../models');
const logger = require('../../../logger/logger');
module.exports = async (req, res) => {
  const id = req.params.id;
  logger.info("find chapter id :", id)
  const chapter = await Chapter.findByPk(id);
  if (!chapter) {
    return res.status(404).json(
      {
        status: 'error',
        message: 'chapter not found'
      }
    )
  }
  return res.json({
    status: 'success',
    data: chapter
  })
}