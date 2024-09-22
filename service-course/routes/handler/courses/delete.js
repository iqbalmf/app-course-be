const { Course } = require('../../../models');
const logger = require('../../../logger/logger');
module.exports = async (req, res) => {
  const id = req.params.id;
  logger.info("checking course id: ", id);
  const mentor = await Course.findByPk(id);
  if (!mentor) {
    return res.status(404).json({
      status: 'error',
      message: 'course not found'
    })
  }
  await mentor.destroy();
  return res.json({
    status: 'success',
    message: 'course deleted'
  })
}