const Router = require('express');
const router = new Router();
const authController = require('../controllers/auth.controller');

router.get('/registration', authController.getAuthPage);

router.post('/registration', authController.register);

router.get('/login', authController.getAuthPage);

router.post('/login', authController.signin);

module.exports = router;
