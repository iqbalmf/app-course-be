const {ImageCourse} = require('../../../models');
const logger = require('../../../logger/logger');
module.exports = async (req, res) => {
  const id = req.params.id;
  logger.info("find images id :", id)
  const image = await ImageCourse.findByPk(id);
  if (!image) {
    return res.status(404).json(
      {
        status: 'error',
        message: 'ImageCourse not found'
      }
    )
  }
  return res.json({
    status: 'success',
    data: image
  })
}