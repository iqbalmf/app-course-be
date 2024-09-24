const {Lesson} = require('../../../models');
const logger = require('../../../logger/logger');

module.exports = async (req, res) => {
  try {
    const lessons = await Lesson.findAll(
      {order: [['createdAt', 'DESC']]}
    );
    return res.json({
      status: 'success',
      data: lessons
    })
  } catch (error){
    logger.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching chapter.'
    })
  }
}