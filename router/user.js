const express = require('express')
const { login, register, getCurrentUser, updateCurrentUser } = require('../controller/user')
const userValidator = require('../validator/user')

const router = express.Router()

router.post('/users/login', login)

router.post('/users', userValidator.register, register)

router.get('/user', getCurrentUser)

router.put('/user', updateCurrentUser)

module.exports = router
