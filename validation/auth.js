//Middleware
const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			errors: errors.mapped()
		});
	} else next();
}

exports.signup = [
	body('username')
	.not().isEmpty().withMessage('Username is required.')
	.trim().isLength({min: 4}).withMessage('Username must contain at least 4 characters.')
	.isAlpha().withMessage('Username must be alphanumeric.'),
	
	body('email')
	.not().isEmpty().withMessage('Email is required.')
	.isEmail().withMessage('Invalid Email.'),

	body('password')
	.not().isEmpty().withMessage('Password is required.')
	.not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password.')
	.trim().isLength({min: 6}).withMessage('Password must contain at least 6 characters.'),

	validate
];



exports.login = [
	body('email')
	.not().isEmpty().withMessage('Email is required.')
	.isEmail().withMessage('Invalid Email.'),

	body('password')
	.not().isEmpty().withMessage('Password is required.')
	.trim().isLength({min: 6}).withMessage('Password must contain at least 6 characters.'),

	validate
]