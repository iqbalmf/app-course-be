const {Reviews} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  const id = req.params.id
  const review = await Reviews.findByPk(id)
  if (!review) {
    return res.status(404).json({
      status: 'error',
      message: 'review not found'
    })
  }
  const schema = {
    rating: {type: 'number', max: 5, min: 1, integer: true, optional: true},
    note: {type: 'string', optional: true}
  }
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate
    })
  }
  const {rating, note} = req.body
  await review.update({
    rating: !rating ? review.rating : rating, note: !note ? review.note : note
  });
  return res.json({
    status: 'success',
    data: {
      id: review.id,
      rating: review.rating,
      note: review.note,
      courseId: review.courseId,
      userId: review.userId
    }
  })
}