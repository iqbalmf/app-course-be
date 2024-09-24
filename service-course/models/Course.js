const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    certificate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM,
      values: ['free', 'premium'],
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['draft', 'published'],
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    level: {
      type: DataTypes.ENUM,
      values: ['all-level', 'beginner', 'intermediate', 'advanced'],
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mentorId: {
      field: 'mentor_id',
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    }
  }, {
    tableName: 'courses',
    timestamps: true
  });
  Course.associate = function(models) {
    Course.hasMany(models.MyCourse, {
      foreignKey: 'courseId',
      as: 'myCourses'
    });
  };

  return Course;
}