const { body } = require ('express-validator')

exports.registerValidator = [
    body('user')
        .notEmpty()
        .withMessage('user is required')
        .isLength({ min: 3})
        .withMessage('Username must be at least 3 characters'),
    body('email')
        .isEmail()
        .withMessage('invalid email')
        .normalizeEmail(),
    body('password')
        .isLength({min : 6})
        .withMessage('password must be at 6 character')
        .matches(/\d/)
        .withMessage('password must contain at least one number'),
]

exports.loginValidator = [
    body('email')
        .isEmail()
        .withMessage('invalid email')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('password is required')
]