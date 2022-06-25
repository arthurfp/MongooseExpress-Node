const { body } = require('express-validator')
const validate = require('../middleware/validate')
const { User } = require('../model')
const md5 = require('../util/md5')

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
        body('user.email').custom(async (email, { req }) => {
            const user = await User.findOne({ email })
                .select(['email', 'username', 'bio', 'image', 'password'])
            if (!user) {
                return Promise.reject('User does not exist')
            }
            req.user = user
        })
    ]),
    validate([
        body('user.password').custom(async (password, { req }) => {
            if (md5(password) !== req.user.password) {
                return Promise.reject('wrong password')
            }
        })
    ])
]
