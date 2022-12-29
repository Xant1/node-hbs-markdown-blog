const express = require('express');
const postController = require('../controllers/post.controller');
const editRouter = express.Router();

editRouter.use('/edit/:id', postController.getEditPage);
editRouter.use('/', postController.editPost)

module.exports = editRouter;
