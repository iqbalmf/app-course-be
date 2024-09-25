const {Reviews, Course} = require('../../../models');
const Validator = require('fastest-validator');
const logger = require('../../../logger/logger');
const v = new Validator();
const fetchUserData = require('../../../utils/getUserById')
module.exports = async (req, res) => {
  const schema = {
    userId: {type: 'string', nullable: false},
    courseId: {type: 'string', nullable: false, empty: false},
    rating: {type: 'number', max: 5, min: 1, integer: true, nullable: false},
    note: {type: 'string', optional: true}
  }

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    logger.error(`create review: ${JSON.stringify(validate)}`);
    return res.status(400).json({
      status: 'error',
      message: validate,
    });
  }
  const course = await Course.findByPk(req.body.courseId);
  if (!course) {
    logger.error("course not found: ", req.body.courseId);
    return res.status(404).json({
      status: 'error',
      message: 'course not found'
    });
  }
  let userData;

  try {
    userData = await fetchUserData(req.body.userId);
  } catch (error) {
    logger.error(`create_review: get user by id: ${JSON.stringify(req.body.userId)}`)
    return res.status(error.status).json(error.data || {status: 'error', message: error.message});
  }

  const isExistReview = await Reviews.findOne({
    where: {
      course_id: course.id,
      user_id: userData.id.toString(),
    }
  });
  if (isExistReview) {
    logger.error(`user already submit review, ${userData.id}`);
    return res.status(409).json({
      status: 'error',
      message: 'user already submit review'
    });
  }
  const review = {
    userId: userData.id.toString(), courseId: course.id, note: req.body.note, rating: req.body
      .rating
  }
  const createReview = await Reviews.create(review);
  if (createReview) {
    return res.json({
      status: 'success',
      data: {
        id: createReview.id,
        courseId: createReview.courseId,
        userId: createReview.userId,
        rating: createReview.rating,
        note: createReview.note
      }
    });
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'internal server error'
    });
  }
}