const {Mentor} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  const id = req.params.id
  const mentor = await Mentor.findByPk(id)
  if (!mentor) {
    return res.status(404).json({
      status: 'error',
      message: 'mentor not found'
    })
  }
  const schema = {
    name: {type: 'string'},
    email: {type: 'email'},
    profession: {type: 'string', optional: true},
    profile: {type: 'string', optional: true},
  }
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate
    })
  }
  const {name, email, profession, profile} = req.body
  await mentor.update({
    name, email, profession, profile
  });
  return res.json({
    status: 'success',
    data: {
      id: mentor.id,
      name, email, profession, profile
    }
  })
}