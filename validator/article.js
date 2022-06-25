const { body, param } = require('express-validator')
const validate = require('../middleware/validate')
const mongoose = require('mongoose')

exports.createArticle = validate([
    body('article.title').notEmpty().withMessage('Article title cannot be empty'),
    body('article.description').notEmpty().withMessage('Article description cannot be empty'),
    body('article.body').notEmpty().withMessage('Article content cannot be empty'),
])

exports.getArticle = validate([
    param('slug').custom(value => {
        if (!mongoose.isValidObjectId(value)) {
            throw new Error('Article ID type error')
        }
        return true
    })
])
