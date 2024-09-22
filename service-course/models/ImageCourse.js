const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define('ImageCourse', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    courseId: {
      field: 'course_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'image_courses',
    timestamps: true
  })
}