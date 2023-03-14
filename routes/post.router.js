const express = require('express');
const postController = require('../controllers/post.controller');
const postRouter = express.Router();

postRouter.get('/', postController.getAllPosts);

postRouter.get('/post/:slug', postController.getPost);

postRouter.get('/create', postController.getCreatePage);

postRouter.post('/create', postController.createNewPost);

postRouter.post('/delete/:id', postController.deletePost);

postRouter.get('/edit/:id', postController.getEditPage);

postRouter.post('/edit', postController.editPost);

module.exports = postRouter;
