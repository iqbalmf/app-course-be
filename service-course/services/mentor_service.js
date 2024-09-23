const {Mentor} = require('../models');
const logger = require('../logger/logger');
const res = require("express/lib/response");

const createMentor = async (req) => {
  try {
    logger.info('Creating mentor...');
    const data = {
      name: req.name,
      email: req.email,
      profession: req.profession,
      profile: req.profile
    };
    const checkMentorEmail = await Mentor.findOne({
      where: {
        email: req.email
      }
    });
    if (checkMentorEmail) {
      logger.error(`Email ${req.email} has already been registered`);
      return { success: false, statusCode: 409, message: 'Email has already been registered' };
    }
    const result =await Mentor.create(data);
    return { success: true, statusCode: 201, message: 'Mentor created successfully', mentor: result };
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

const getMentorById = async (mentorId) => {

}

const getAllMentors = async () => {
  const sqlOption = {
    attributes: ['id', 'name', 'email', 'profession', 'profile']
  }
  const mentors = await Mentor.findAll(sqlOption);
  return { success: true, statusCode: 200, mentor: mentors , message: 'Get Mentors Successfully'};
}

const updateMentor = async (mentorId) => {

}

const deleteMentor = async (mentorId) => {

}

module.exports = {
  createMentor,
  getMentorById,
  getAllMentors,
  updateMentor,
  deleteMentor
}