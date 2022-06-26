const express = require('express')
const articleCtrl = require('../controller/article')
const auth = require('../middleware/auth')
const articleValidator = require('../validator/article')

const router = express.Router()

router.get('/', articleCtrl.getArticles)

router.get('/feed', articleCtrl.getFeedArticles)

router.get('/:slug', articleValidator.getArticle, articleCtrl.getArticle)

router.post('/', auth, articleValidator.createArticle, articleCtrl.createArticle)

router.put('/:slug', auth, articleValidator.updateArticle, articleCtrl.updateArticle)

router.delete('/:slug', auth,articleValidator.deleteArticle, articleCtrl.deleteArticle)

router.post('/:slug/comments', articleCtrl.createArticleComment)

router.get('/:slug/comments', articleCtrl.getArticleComments)

router.delete('/:slug/comments/:id', articleCtrl.deleteArticleComment)

router.post('/:slug/favorite', async (req, res, next) => {
    try {
        res.send('post /articles/:slug/favorite')
    } catch (error) {
        next(error)
    }
})

router.delete('/:slug/favorite', async (req, res, next) => {
    try {
        res.send('delete /articles/:slug/favorite')
    } catch (error) {
        next(error)
    }
})

module.exports = router
