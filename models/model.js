const Sequelize = require('sequelize');

const sequelize = new Sequelize('postjs', 'postgres', 'kbi3234', {
  dialect: 'postgres',
  host: 'localhost',
  define: {
    timestamps: false,
  },
});

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  markdown: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log('sync complete');
  })
  .catch((err) => console.log(err));

module.exports = Post;
