const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Role extends Model {}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'role',
    }
);

module.exports = Role;
