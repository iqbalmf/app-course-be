const { Mentor } = require('../../../models');
module.exports = async (req, res) => {
  const id = req.params.id;
  const mentor = await Mentor.findByPk(id);
  if (!mentor) {
    return res.status(404).json({
      status: 'error',
      message: 'mentor not found'
    })
  }
  await mentor.destroy();
  return res.json({
    status: 'success',
    message: 'mentor deleted'
  })
}