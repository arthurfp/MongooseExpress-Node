const { body } = require('express-validator');
const validate = require('../middleware/validate')
const { User } = require('../model')

exports.register = validate([
    body('user.username')
        .notEmpty().withMessage('Username can not be empty')
        .bail()
        .custom(async value => {
            const user = await User.findOne({ username: value })
            if (user) { return Promise.reject('Username already exists') }
        }),
    body('user.password').notEmpty().withMessage('password can not be blank'),
    body('user.email')
        .notEmpty().withMessage('E-mail can not be empty')
        .isEmail().withMessage('E-mail format is incorrect')
        .bail()
        .custom(async email => {
            const user = await User.findOne({ email })
            if (user) { return Promise.reject('E-mail already exists') }
        })
])

exports.login = [
    validate([
        body('user.email').notEmpty().withMessage('E-mail can not be empty'),
        body('user.password').notEmpty().withMessage('password can not be blank'),
    ]),
    validate([
        
    ])
]
