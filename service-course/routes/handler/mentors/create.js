const {Mentor} = require('../../../models');
const Validator = require('fastest-validator');
const logger = require('../../../logger/logger');
const v = new Validator();
module.exports = async (req, res) => {
  logger.info(req.body)
  const schema = {
    name: {type: 'string', nullable: false},
    email: {type: 'email', nullable: false},
    profession: {type: 'string', optional: true},
    profile: {type: 'string', optional: true}
  }

  const validate = v.validate(req.body, schema);
  if (validate.length){
    return res.status(400).json({
      status: 'error',
      message: validate,
    });
  }
  const data = {
    name: req.body.name,
    email: req.body.email,
    profession: req.body.profession,
    profile: req.body.profile
  };
  const createMentor = await Mentor.create(data);
  if (createMentor){
    return res.json({
      status: 'success',
      data: {
        id: createMentor.id,
        name: createMentor.name,
        email: createMentor.email,
        profession: createMentor.profession,
        profile: createMentor.profile
      }
    });
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'internal server error'
    });
  }
}