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

sequelize
  .sync()
  .then(() => {
    console.log('sync complete');
  })
  .catch((err) => console.log(err));

module.exports = User;
