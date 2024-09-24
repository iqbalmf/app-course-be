const {Chapter} = require('../../../models');
const logger = require('../../../logger/logger');

module.exports = async (req, res) => {
  try {
    const chapters = await Chapter.findAll();
    return res.json({
      status: 'success',
      data: chapters
    })
  } catch (error){
    logger.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching chapter.'
    })
  }
}