const {Course} = require('../../../models');
const logger = require('../../../logger/logger');
module.exports = async (req, res) => {
  const id = req.params.id;
  const courses = await Course.findByPk(id);
  if (!courses) {
    return res.status(404).json(
      {
        status: 'error',
        message: 'courses not found'
      }
    )
  }
  return res.json({
    status: 'success',
    data: courses
  })
}