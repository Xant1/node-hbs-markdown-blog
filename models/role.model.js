const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: 'localhost',
    define: {
      timestamps: false,
    },
  }
);

const Role = sequelize.define('Role', {
  value: {
    type: Sequelize.STRING,
    unique: true,
    default: 'user',
  },
});

module.exports = Role;
