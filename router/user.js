const express = require('express')

const router = express.Router()

router.post('/users/login', async (req, res, next) => {
    try {
        res.send('post /users/login')
    } catch (error) {
        next(error)
    }
})

router.post('/users', async (req, res, next) => {
    try {
        res.send('post /users')
    } catch (error) {
        next(error)
    }
})

router.get('/user', async (req, res, next) => {
    try {
        res.send('get /user')
    } catch (error) {
        next(error)
    }
})

router.put('/user', async (req, res, next) => {
    try {
        res.send('put /user')
    } catch (error) {
        next(error)
    }
})

module.exports = router
