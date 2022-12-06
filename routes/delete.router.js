const express = require('express');
const deleteRouter = express.Router();
const deleteController = require('../controllers/delete.controller');

deleteRouter.use('/delete/:id', deleteController.deletePost);

module.exports = deleteRouter;
