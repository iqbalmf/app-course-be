const {Mentor} = require('../../../models');
module.exports = async (req, res) => {
  const id = req.params.id;
  const sqlOption = {
    attributes: ['id', 'name', 'email', 'profession', 'profile']
  }
  const mentor = await Mentor.findByPk(id, sqlOption);
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