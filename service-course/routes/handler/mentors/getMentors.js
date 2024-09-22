const {Mentor} = require('../../../models');
module.exports = async (req, res) => {
  const sqlOption = {
    attributes: ['id', 'name', 'email', 'profession', 'profile']
  }
  const mentors = await Mentor.findAll(sqlOption);
  return res.json({
    status: 'success',
    data: mentors
  })
}