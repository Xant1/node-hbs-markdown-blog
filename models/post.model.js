const Sequelize = require('sequelize');

const SequelizeSlugify = require('sequelize-slugify');

const sequelize = new Sequelize('post', 'user', 'r203085', {
  dialect: 'postgres',
  host: 'localhost',
  define: {
    timestamps: false,
  },
});

const Post = sequelize.define('Post', {
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
  markdown: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    unique: true,
  },
});

SequelizeSlugify.slugifyModel(Post, {
  source: ['title'],
});

sequelize
  .sync()
  .then(() => {
    console.log('sync complete');
  })
  .catch((err) => console.log(err));

module.exports = Post;
