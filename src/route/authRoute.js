const route = require('express').Router();
const {body} = require('express-validator');
const authController = require('../controller/auth/authController');
const validator = require('../util/validator');

module.exports = route.post('/register',validator.authValidate([
    body('email').isEmail(),
    body('password').isLength({min: 5})
]), authController.register)
    .post('/login', authController.login);

