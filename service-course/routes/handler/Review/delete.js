const { Reviews } = require('../../../models');
module.exports = async (req, res) => {
  const id = req.params.id;
  const review = await Reviews.findByPk(id);
  if (!review) {
    return res.status(404).json({
      status: 'error',
      message: 'review not found'
    })
  }
  await review.destroy();
  return res.json({
    status: 'success',
    message: 'review deleted'
  })
}