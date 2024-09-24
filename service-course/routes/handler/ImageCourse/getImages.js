const {ImageCourse} = require('../../../models');
const logger = require('../../../logger/logger');

module.exports = async (req, res) => {
  try {
    const images = await ImageCourse.findAll(
      {order: [['createdAt', 'DESC']]}
    );
    return res.json({
      status: 'success',
      data: images
    })
  } catch (error){
    logger.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching ImageCourse.'
    })
  }
}