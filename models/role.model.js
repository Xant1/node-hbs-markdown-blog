const Sequelize = require('sequelize');

const sequelize = new Sequelize('it-usta', 'xan', 'kbi3234', {
  dialect: 'postgres',
  host: 'localhost',
  define: {
    timestamps: false,
  },
});

const Role = sequelize.define('Role', {
  value: {
    type: Sequelize.STRING,
    unique: true,
    default: 'user',
  },
});

module.exports = Role;
