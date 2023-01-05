const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { Article } = require('../model');

exports.createArticle = validate([
  body('article.title').notEmpty().withMessage('Article title cannot be empty'),
  body('article.description')
    .notEmpty()
    .withMessage('Article description cannot be empty'),
  body('article.body')
    .notEmpty()
    .withMessage('Article content cannot be empty'),
]);

exports.getArticle = validate([validate.isValidObjectId(['params'], 'slug')]);

exports.updateArticle = [
  validate([validate.isValidObjectId(['params'], 'slug')]),
  // Check if the article exists
  // Modify whether the author of the article is the currently logged in user
  async (req, res, next) => {
    const articleId = req.params.slug;
    const article = await Article.findById(articleId);
    req.article = article;
    if (!article) {
      return res.status(404).end();
    }
    return next();
  },
  async (req, res, next) => {
    if (req.user.id.toString() !== req.article.author.toString()) {
      return res.status(403).end();
    }
    return next();
  },
];

exports.deleteArticle = exports.updateArticle;
