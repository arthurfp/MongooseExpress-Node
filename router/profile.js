const express = require('express')

const router = express.Router()

// Get user profile
router.get('/:username', async (req, res, next) => {
    try {
        // process the request
        res.send('get /profiles/:username')
    } catch (error) {
        next(error)
    }
})

// Follow user
router.post('/:username/follow', async (req, res, next) => {
    try {
        // process the request
        res.send('post /profiles/:username/follow')
    } catch (error) {
        next(error)
    }
})

// Unfollow user
router.delete('/:username/follow', async (req, res, next) => {
    try {
        // process the request
        res.send('delete /profiles/:username/follow')
    } catch (error) {
        next(error)
    }
})


module.exports = router
