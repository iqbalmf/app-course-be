const {Mentor} = require('../../../models');
const Validator = require('fastest-validator');
const logger = require('../../../logger/logger');
const v = new Validator();
module.exports = async (req, res) => {
  const schema = {
    name: {type: 'string', nullable: false},
    email: {type: 'email', nullable: false},
    profession: {type: 'string', optional: true},
    profile: {type: 'string', optional: true}
  }

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    logger.error(`get mentor: ${JSON.stringify(validate)}`);
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
  const checkEmail = await Mentor.findOne({where: {email: req.body.email}});
  if (checkEmail) {
    return res.status(409).json({
      status: "error",
      message: "Email has been registered",
    })
  }
  const createMentor = await Mentor.create(data);
  if (createMentor) {
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