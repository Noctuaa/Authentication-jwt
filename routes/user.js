//Middlewares
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

//Controllers
const UserController = require('../controllers/UserController');

//Routes
router.get('/dashboard', auth.authenticate, UserController.index);

module.exports = router;