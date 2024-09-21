module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Course', {
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
    mentor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    tableName: 'courses',
  });
}