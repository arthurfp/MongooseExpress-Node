const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        res.send('get /tags')
    } catch (error) {
        next(error)
    }
})

module.exports = router
