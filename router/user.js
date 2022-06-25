const express = require('express')
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/users/login', userValidator.login, userCtrl.login)

router.post('/users', userValidator.register, userCtrl.register)

router.get('/user', auth, userCtrl.getCurrentUser)

router.put('/user', auth, userCtrl.updateCurrentUser)

module.exports = router
