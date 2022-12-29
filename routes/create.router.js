const express = require('express');
const postController = require('../controllers/post.controller');
const createRouter = express.Router();

createRouter.use('/', postController.getCreatePage);

module.exports = createRouter;
