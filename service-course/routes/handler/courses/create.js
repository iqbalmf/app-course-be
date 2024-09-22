const {Course} = require('../../../models');
const {Mentor} = require('../../../models');
const Validator = require('fastest-validator');
const logger = require('../../../logger/logger');
const v = new Validator();

module.exports = async (req, res) => {
  logger.info("Request: ", req.body)
  const schema = {
    name: {type: 'string', nullable: false},
    certificate: {type: 'boolean', nullable: false},
    type: {type: 'string', enum: ['free', 'premium']},
    thumbnail: {type: 'string', optional: true},
    status: {type: 'string', enum: ['draft', 'published']},
    price: {type: 'number', empty: false},
    level: {type: 'string', enum: ['beginner', 'intermediate', 'advanced', 'all-level']},
    description: {type: 'string', optional: true},
    mentorId: {type: 'string', nullable: false},
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error', message: validate
    });
  }
  if (req.body.price < 0) {
    return res.status(400).json({
      status: 'error', message: 'price must be greater than 0',
    });
  }
  logger.info("check mentor id: ", req.body.mentorId);
  const checkMentor = await Mentor.findByPk(req.body.mentorId)
  if (!checkMentor) {
    return res.status(400).json({
      status: 'error', message: 'mentor not found',
    });
  }

  const course = {
    name: req.body.name, certificate: req.body.certificate, type: req.body.type,
    status: req.body.status, level: req.body.level, mentorID: req.body.mentorId,
    description: req.body.description, price: req.body.price, thumbnail: req.body.thumbnail
  }
  const createCourse = await Course.create(course);
  if (createCourse) {
    return res.json({
      status: 'success', data: {
        id: createCourse.id,
        name: createCourse.name,
        certificate: createCourse.certificate,
        type: createCourse.type,
        status: createCourse.status,
        level: createCourse.level,
        mentorID: createCourse.mentorId,
        description: createCourse.description,
        price: createCourse.price,
        thumbnail: createCourse.thumbnail,
      },
    });
  }
}