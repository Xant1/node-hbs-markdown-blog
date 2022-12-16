const express = require('express');
const indexController = require('../controllers/index.controller');
const getPostRouter = express.Router();

getPostRouter.use('/post/:id', indexController.getPost);

module.exports = getPostRouter;
