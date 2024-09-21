module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Mentor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt:{
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt:{
      field: 'updated_at',
      type: DataTypes.DATE,
    }
  }, {
    tableName: 'mentors',
    timestamps: true
  })
}