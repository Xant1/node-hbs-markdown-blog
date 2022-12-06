const express = require('express');
const createController = require('../controllers/create.controller');
const createNewPostRouter = express.Router();

createNewPostRouter.use('/', createController.createNewPost);

module.exports = createNewPostRouter;
