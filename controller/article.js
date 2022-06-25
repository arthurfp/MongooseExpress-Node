const { Article, User } = require('../model')

exports.getArticles = async (req, res, next) => {
    try {
        const {
            limit = 10,
            offset = 0,
            tag,
            author,
            favorited
        } = req.query

        const filter = {}

        if (tag) {
            filter.tagList = tag
        }

        if (author) {
            const user = await User.findOne({ username: author })
            filter.author = user ? user._id : null
        }

        const articles = await Article.find(filter)
            .skip(Number.parseInt(offset))
            .limit(Number.parseInt(limit))
            .sort({
                createdAt: -1
            })

        const articlesCount = await Article.countDocuments()

        res.status(200).json({
            articles,
            articlesCount
        })
    } catch (error) {
        next(error)
    }
}

exports.getFeedArticles = async (req, res, next) => {
    try {
        res.send('get /articles/feed')
    } catch (error) {
        next(error)
    }
}

exports.getArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.slug)
            .populate('author')
        if (!article) {
            return res.status(404).end()
        }
        res.status(200).json({
            article
        })
    } catch (error) {
        next(error)
    }
}

exports.createArticle = async (req, res, next) => {
    try {
        const article = new Article(req.body.article)
        article.author = req.user._id
        article.populate('author')
        await article.save()
        res.status(201).json({
            article
        })
    } catch (error) {
        next(error)
    }
}

exports.updateArticle = async (req, res, next) => {
    try {
        res.send('put /articles/:slug')
    } catch (error) {
        next(error)
    }
}

exports.deleteArticle = async (req, res, next) => {
    try {
        res.send('delete /articles/:slug')
    } catch (error) {
        next(error)
    }
}

exports.createArticleComment = async (req, res, next) => {
    try {
        res.send('post /articles/:slug/comments')
    } catch (error) {
        next(error)
    }
}

exports.getArticleComments = async (req, res, next) => {
    try {
        res.send('get /articles/:slug/comments')
    } catch (error) {
        next(error)
    }
}

exports.deleteArticleComment = async (req, res, next) => {
    try {
        res.send('delete /articles/:slug/comments/:id')
    } catch (error) {
        next(error)
    }
}
