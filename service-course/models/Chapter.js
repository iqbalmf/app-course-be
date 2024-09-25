const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
  const Chapter = sequelize.define('Chapter', {
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
    courseId: {
      field: 'course_id',
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    tableName: 'chapters',
    timestamps: true,
  });
  Chapter.associate = function (models){
    Chapter.hasMany(models.Lesson, {
      foreignKey: 'chapterId',
      as: 'lesson'
    })
  }

  return Chapter
}