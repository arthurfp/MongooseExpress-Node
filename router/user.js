const express = require('express')
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')
const auth = require('../middleware/auth')

const router = express.Router()

// User login
router.post('/users/login', userValidator.login, userCtrl.login)

// User registration
router.post('/users', userValidator.register, userCtrl.register)

// Get the currently logged in user
router.get('/user', auth, userCtrl.getCurrentUser)

// Update the currently logged in user
router.put('/user', auth, userCtrl.updateCurrentUser)

module.exports = router
