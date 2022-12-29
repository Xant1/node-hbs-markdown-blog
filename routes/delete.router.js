const express = require('express');
const postController = require('../controllers/post.controller');
const deleteRouter = express.Router();

deleteRouter.use('/delete/:id', postController.deletePost);

module.exports = deleteRouter;
