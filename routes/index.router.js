const express = require('express');
const postController = require('../controllers/post.controller');
const indexRouter = express.Router();

indexRouter.use('/', postController.getAllPosts);

module.exports = indexRouter;
