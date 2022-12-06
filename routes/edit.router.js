const express = require('express');
const editController = require('../controllers/edit.controller');
const editRouter = express.Router();

editRouter.use('/edit/:id', editController.getEditPage);
editRouter.use('/', editController.editPost)

module.exports = editRouter;
