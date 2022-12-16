const express = require('express');
const indexController = require('../controllers/index.controller');
const indexRouter = express.Router();

indexRouter.use('/', indexController.getAllPosts);


module.exports = indexRouter;
