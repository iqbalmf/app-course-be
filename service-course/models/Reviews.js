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
      field: 'user_id',
      type: DataTypes.STRING,
      allowNull: false
    },
    courseId: {
      field: 'course_id',
      type: DataTypes.STRING,
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
    tableName: 'reviews',
    timestamps: true
  })
}