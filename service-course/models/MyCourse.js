const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define('MyCourse', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    CourseId: {
      field: 'course_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'my_courses',
    timestamps: true,
  });
}