const Router = require('express')
const router = new Router()
const authController = require('../controllers/auth.controller')
const {check} = require("express-validator")

router.post('/registration', [
    check('username', "The user name cannot be empty").notEmpty(),
    check('password', "The password must be more than 5 and less than 15 characters").isLength({min:5, max:15})
], authController.registration)
router.post('/login', authController.login)
//router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)

module.exports = router
