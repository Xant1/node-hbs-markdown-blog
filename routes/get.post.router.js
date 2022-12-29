const express = require('express');
const indexController = require('../controllers/post.controller');
const getPostRouter = express.Router();

getPostRouter.use('/post/:slug', indexController.getPost);

module.exports = getPostRouter;
