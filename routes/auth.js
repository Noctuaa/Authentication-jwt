//Middlewares
const express = require('express');
const router = express.Router();

//Validations
const validate = require('../validation/auth');

//Controllers
const AuthController = require('../controllers/AuthController');

//Routes
router.post('/signup', validate.signup , AuthController.register);
router.post('/login', validate.login, AuthController.login);
router.post('/confirmation/:token', AuthController.verifyAccount);

module.exports = router;