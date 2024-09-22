const {Course} = require('../../../models');
const logger = require('../../../logger/logger')
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  const id = req.params.id;
  const schema = {
    name: {type: 'string', optional: true},
    certificate: {type: 'boolean', optional: true},
    type: {type: 'string', enum: ['free', 'premium'],optional: true},
    thumbnail: {type: 'string', optional: true},
    status: {type: 'string', enum: ['draft', 'published'], optional: true},
    price: {type: 'number', optional: true},
    level: {type: 'string', enum: ['beginner', 'intermediate', 'advanced', 'all-level'], optional: true},
    description: {type: 'string', optional: true},
    mentorId: {type: 'string', nullable: false, optional: true},
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    logger.error("validate: ", validate)
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }

  const course = await Course.findByPk(id);
  if (!course) {
    logger.error("course not found")
    return res.status(404).json({
      status: 'error',
      message: 'course not found'
    })
  }
  if (req.body.mentorId !== course.mentorId){
    logger.error("error: mentor id want to change")
    return res.status(404).json({
      status: 'error',
      message: 'cannot change mentor id'
    })
  }
  logger.info("update data course")
  let updateCourse = {
    name: req.body.name, certificate: req.body.certificate, type: req.body.type,
      status: req.body.status, level: req.body.level, mentorID: req.body.mentorId,
      description: req.body.description, price: req.body.price, thumbnail: req.body.thumbnail
  }
  updateCourse = await course.update(updateCourse)
  return res.json({
    status: 'success',
    data: {
      id: updateCourse.id,
      name: updateCourse.name,
      certificate: updateCourse.certificate,
      type: updateCourse.type,
      status: updateCourse.status,
      level: updateCourse.level,
      mentorID: updateCourse.mentorId,
      description: updateCourse.description,
      price: updateCourse.price,
      thumbnail: updateCourse.thumbnail,
    }
  })
}