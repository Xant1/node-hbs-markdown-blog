const Sequelize = require('sequelize');

const sequelize = new Sequelize('it-usta', 'xan', 'kbi3234', {
  dialect: 'postgres',
  host: 'localhost',
  define: {
    timestamps: false,
  },
});

const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  roles: {
    type: Sequelize.STRING,
    references: 'Role',
  },
});

module.exports = User;
