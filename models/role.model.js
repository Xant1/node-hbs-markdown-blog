const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      unique: true,
      default: 'user',
    },
  },
  {
    sequelize,
    modelName: 'role',
  }
);

module.exports = Role;
