const { Model, DataTypes } = require('sequelize');

const SequelizeSlugify = require('sequelize-slugify');

const sequelize = require('../config/connection.js');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        markdown: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'post',
    }
);

SequelizeSlugify.slugifyModel(Post, {
    source: ['title'],
});

module.exports = Post;
