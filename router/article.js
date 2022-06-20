const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        res.send('get /articles')
    } catch (error) {
        next(error)
    }
})

router.get('/feed', async (req, res, next) => {
    try {
        res.send('get /articles/feed')
    } catch (error) {
        next(error)
    }
})

router.get('/:slug', async (req, res, next) => {
    try {
        res.send('get /articles/:slug')
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        res.send('post /articles')
    } catch (error) {
        next(error)
    }
})

router.put('/:slug', async (req, res, next) => {
    try {
        res.send('put /articles/:slug')
    } catch (error) {
        next(error)
    }
})

router.delete('/:slug', async (req, res, next) => {
    try {
        res.send('delete /articles/:slug')
    } catch (error) {
        next(error)
    }
})

router.post('/:slug/comments', async (req, res, next) => {
    try {
        res.send('post /articles/:slug/comments')
    } catch (error) {
        next(error)
    }
})

router.get('/:slug/comments', async (req, res, next) => {
    try {
        res.send('get /articles/:slug/comments')
    } catch (error) {
        next(error)
    }
})

router.delete('/:slug/comments/:id', async (req, res, next) => {
    try {
        res.send('delete /articles/:slug/comments/:id')
    } catch (error) {
        next(error)
    }
})

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
