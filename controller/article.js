const { Article, User } = require('../model');

// Get list of articles
exports.getArticles = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0, tag, author } = req.query;

    const filter = {};

    if (tag) {
      filter.tagList = tag; // query the fields contained in tagList
    }

    if (author) {
      const user = await User.findOne({ username: author });
      filter.author = user ? user.id : null;
    }

    const articles = await Article.find(filter)
      .skip(Number.parseInt(offset, 10))
      .limit(Number.parseInt(limit, 10))
      .sort({
        createdAt: -1, // -1 descending, 1 ascending
      });

    const articlesCount = await Article.countDocuments();

    res.status(200).json({
      articles,
      articlesCount,
    });
  } catch (error) {
    next(error);
  }
};

// Get the list of author articles that the user follows
exports.getFeedArticles = async (req, res, next) => {
  try {
    // process the request
    res.send('get /articles/feed');
  } catch (error) {
    next(error);
  }
};

// Get article
exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.slug).populate('author');
    if (!article) {
      return res.status(404).end();
    }
    return res.status(200).json({
      article,
    });
  } catch (error) {
    return next(error);
  }
};

// Create article
exports.createArticle = async (req, res, next) => {
  try {
    const article = new Article(req.body.article);
    article.author = req.user.id;
    article.populate('author');
    await article.save();
    res.status(201).json({
      article,
    });
  } catch (error) {
    next(error);
  }
};

// Update article
exports.updateArticle = async (req, res, next) => {
  try {
    const { article } = req;
    const bodyArticle = req.body.article;
    article.title = bodyArticle.title || article.title;
    article.body = bodyArticle.body || article.body;
    article.descripotion = bodyArticle.descripotion || article.descripotion;
    await article.save();
    res.status(200).json({
      article,
    });
  } catch (error) {
    next(error);
  }
};

// Delete article
exports.deleteArticle = async (req, res, next) => {
  try {
    const { article } = req;
    await article.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Add comments to article
exports.createArticleComment = async (req, res, next) => {
  try {
    // process the request
    res.send('post /articles/:slug/comments');
  } catch (error) {
    next(error);
  }
};

// Get article comments
exports.getArticleComments = async (req, res, next) => {
  try {
    // process the request
    res.send('get /articles/:slug/comments');
  } catch (error) {
    next(error);
  }
};

// Delete article comments
exports.deleteArticleComment = async (req, res, next) => {
  try {
    // process the request
    res.send('delete /articles/:slug/comments/:id');
  } catch (error) {
    next(error);
  }
};
