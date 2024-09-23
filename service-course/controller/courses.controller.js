const MentorService = require("../services/mentor_service");
const logger = require("../logger/logger");
const response = require('../utils/response');
const Validator = require("fastest-validator");
const v = new Validator();

const createMentor = async (req, res) => {
  try {
    const schema = {
      name: {type: 'string', nullable: false},
      email: {type: 'email', nullable: false},
      profession: {type: 'string', optional: true},
      profile: {type: 'string', optional: true}
    }
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return response(res, 400, validate);
    }

    const mentor = await MentorService.createMentor(req.body);
    if (!mentor.success) {
      return response(res, mentor.statusCode, {message: mentor.message});
    }
    return response(res, mentor.statusCode, {message: mentor.message, data: mentor.mentor});
  } catch (error) {
    logger.error(error);
    res.status(400).json({message: 'Error creating user', error});
  }
}

const getAllMentor = async (req, res) => {
  try {
    const mentors = await MentorService.getAllMentors()
    if (!mentors.success){
      return response(res, mentors.statusCode, {message: mentors.message});
    }
    return response(res, mentors.statusCode, {message: mentors.message, data: mentors.mentor});
  } catch (error) {
    logger.error(error);
    return response(res, 500, {message: 'Internal server error'});
  }
}


module.exports = {
  createMentor,
  getAllMentor,
};
