const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { User } = require('../model');
const sha256 = require('../util/sha256');

exports.register = validate([
  // 1. Configure validation rules
  body('user.username')
    .notEmpty()
    .withMessage('Username cannot be empty')
    .bail() // stop running validation if previous validation fails, preventing access to database or external API
    .custom(async (value) => {
      // custom validation rules
      const user = await User.findOne({ username: value });
      if (user) {
        return Promise.reject(new Error('Username already exists'));
      }
      return user;
    }),
  body('user.password').notEmpty().withMessage('Password cannot be empty'),
  body('user.email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Email format is incorrect')
    .bail() // stop running validation if previous validation fails, preventing access to database or external API
    .custom(async (email) => {
      // custom validation rules
      const user = await User.findOne({ email });
      if (user) {
        return Promise.reject(new Error('Email already exists'));
      }
      return user;
    }),
]);

exports.login = [
  validate([
    body('user.email').notEmpty().withMessage('Email cannot be empty'),
    body('user.password').notEmpty().withMessage('Password cannot be empty'),
  ]),
  validate([
    body('user.email').custom(async (email, { req }) => {
      const user = await User.findOne({ email }).select([
        'email',
        'username',
        'bio',
        'image',
        'password',
      ]); // Output the respective fields (with id field by default)
      if (!user) {
        return Promise.reject(new Error('User does not exist'));
      }
      // Mount the data into the request object (to be used on subsequent middlewares if it's the case)
      req.user = user;
      return req;
    }),
  ]),
  validate([
    body('user.password').custom(async (password, { req }) => {
      if (sha256(password) !== req.user.password) {
        return Promise.reject(new Error('Password error'));
      }
      return req;
    }),
  ]),
];
