const express = require('express');
const postController = require('../controllers/post.controller');
const createNewPostRouter = express.Router();

createNewPostRouter.use('/', postController.createNewPost);

module.exports = createNewPostRouter;
