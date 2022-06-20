const express = require('express')

const router = express.Router()

router.get('/:username', async (req, res, next) => {
    try {
        res.send('get /profiles/:username')
    } catch (error) {
        next(error)
    }
})

router.post('/:username/follow', async (req, res, next) => {
    try {
        res.send('post /profiles/:username/follow')
    } catch (error) {
        next(error)
    }
})

router.delete('/:username/follow', async (req, res, next) => {
    try {
        res.send('delete /profiles/:username/follow')
    } catch (error) {
        next(error)
    }
})


module.exports = router
