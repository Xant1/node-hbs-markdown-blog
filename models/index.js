const { Sequelize } = require('sequelize');

const sequelize = require('../config/connection.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model');
db.role = require('./role.model');

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
  as: 'roles',
  
});

db.ROLES = ['user', 'editor', 'admin'];
module.exports = db;
