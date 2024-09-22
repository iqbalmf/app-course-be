const {Course} = require('../../../models');
const {Op} = require("sequelize");
const logger = require('../../../logger/logger');

module.exports = async (req, res) => {
  try {

    let {page = 1, limit = 10} = req.query
    const {q, status, type} = req.query
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const offset = (page - 1) * limit
    const where = {};
    logger.info("query:", req.query);
    if (q) {
      where[Op.or] = [
        {name: {[Op.like]: `%${q}`}},
      ]
    }
    if (status) {
      where.status = status;
    }
    if (type) {
      where.type = type;
    }

    const attributes = {
      attributes: ['id', 'name', 'certificate', 'type', 'thumbnail', 'status', 'price', 'level', 'description', 'mentorID']
    }
    const {
      rows: courses,
      count: totalItems
    } = await Course.findAndCountAll({where, limit, offset});

    const totalPages = Math.ceil(totalItems / limit);


    return res.json({
      status: 'success',
      data: courses,
      meta: {
        currentPage: page,
        totalPages,
        totalItems,
        perPage: limit
      }
    })

  } catch (error){
    logger.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occured while fetching courses.'
    })
  }
}