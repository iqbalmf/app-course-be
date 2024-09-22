const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define('Reviews', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      fields: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    courseId: {
      fields: 'course_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    tableName: 'reviews',
    timestamps: true
  })
}