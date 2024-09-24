const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
  const MyCourse = sequelize.define('MyCourse', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    courseId: {
      field: 'course_id',
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Course',
        key: 'id'
      }
    },
    userId: {
      field: 'user_id',
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'my_courses',
    timestamps: true,
  });

  MyCourse.associate = function(course) {
    MyCourse.belongsTo(course.Course, {
      foreignKey: 'courseId',
      as: 'course'
    });
  }
  return MyCourse;
}