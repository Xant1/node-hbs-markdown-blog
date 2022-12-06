const express = require('express');
const createController = require('../controllers/create.controller');
const createRouter = express.Router();

createRouter.use('/', createController.getCreatePage);

module.exports = createRouter;
