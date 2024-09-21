module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ImageCourse', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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