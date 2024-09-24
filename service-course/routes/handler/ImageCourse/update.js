const {ImageCourse} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const logger = require('../../../logger/logger')

module.exports = async (req, res) => {
  const id = req.params.id;
  const schema = {
    image: {type: "string", nullable: false},
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    logger.error("validate: ", validate)
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }

  const image = await ImageCourse.findByPk(id);
  if (!image){
    logger.error("error get data images")
    return res.status(404).json({
      status: 'error',
      message: 'images not found'
    })
  }
  logger.info("update data images")
  let updateImage = {
    image: req.body.image
  }

  updateImage = await image.update(updateImage);
  return res.json({
    status: 'success',
    data: {
      id: updateImage.id,
      image: updateImage.image,
      courseId: updateImage.courseId,
      updatedAt: updateImage.updatedAt,
    }
  })
}