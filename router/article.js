const express = require('express');
const articleCtrl = require('../controller/article');
const auth = require('../middleware/auth');
const articleValidator = require('../validator/article');

const router = express.Router();

// Get list of articles
router.get('/', articleCtrl.getArticles);

// Get the list of author articles that the user follows
router.get('/feed', articleCtrl.getFeedArticles);

// Get articles
router.get('/:slug', articleValidator.getArticle, articleCtrl.getArticle);

// Create article
router.post(
  '/',
  auth,
  articleValidator.createArticle,
  articleCtrl.createArticle
);

// Update the article
router.put(
  '/:slug',
  auth,
  articleValidator.updateArticle,
  articleCtrl.updateArticle
);

// Delete article
router.delete(
  '/:slug',
  auth,
  articleValidator.deleteArticle,
  articleCtrl.deleteArticle
);

// Add comments to article
router.post('/:slug/comments', articleCtrl.createArticleComment);

// Get article comments
router.get('/:slug/comments', articleCtrl.getArticleComments);

// Delete article comment
router.delete('/:slug/comments/:id', articleCtrl.deleteArticleComment);

// Favorite articles
router.post('/:slug/favorite', async (req, res, next) => {
  try {
    // process the request
    res.send('post /articles/:slug/favorite');
  } catch (error) {
    next(error);
  }
});

// Remove articles from favorites
router.delete('/:slug/favorite', async (req, res, next) => {
  try {
    // process the request
    res.send('delete /articles/:slug/favorite');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
