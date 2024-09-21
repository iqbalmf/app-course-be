module.exports = (sequelize, DataTypes) => {
  return sequelize.define('MyCourse', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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