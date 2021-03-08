const route = require('express').Router();
const {body} = require('express-validator');
const authController = require('../controller/auth/authController');
const validator = require('../util/validator');

route.post('/register',validator.authValidate([
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
]),authController.register);

route.post('/login',authController.login);

module.exports = route;
