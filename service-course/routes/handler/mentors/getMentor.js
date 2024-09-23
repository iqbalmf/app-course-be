const {Mentor} = require('../../../models');
const logger = require('../../../logger/logger');
module.exports = async (req, res) => {
  const id = req.params.id;
  const sqlOption = {
    attributes: ['id', 'name', 'email', 'profession', 'profile']
  }
  const mentor = await Mentor.findByPk(id, sqlOption);
  logger.info(`get mentor: ${JSON.stringify(mentor)}`);
  if (!mentor){
    return res.status(404).json({
      status: 'error',
      message: 'mentor not found'
    })
  }
  return res.json({
    status: 'success',
    data: mentor
  })
}