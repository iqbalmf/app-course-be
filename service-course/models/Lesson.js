const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
  const Lesson =  sequelize.define('Lesson', {
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
    video: {
      type: DataTypes.STRING,
      allowNull: false
    },
    chapterId: {
      field: 'chapter_id',
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
    tableName: 'lessons',
    timestamps: true,
  });
  Lesson.associate = function (models) {
    Lesson.belongsTo(models.Chapter, {
      foreignKey: 'chapterId',
      as: 'chapter'
    })
  }
  return Lesson;
}