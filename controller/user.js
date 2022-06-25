const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')

exports.login = async (req, res, next) => {
    try {
        const user = req.user.toJSON()
        const token = await jwt.sign({
            userId: user._id
        }, jwtSecret, {
            expiresIn: 60 * 60 * 24
        })

        delete user.password
        res.status(200).json({
            ...user,
            token
        })
    } catch (error) {
        next(error)
    }
}

exports.register = async (req, res, next) => {
    try {
        let user = new User(req.body.user) 

        await user.save()

        user = user.toJSON()

        delete user.password

        res.status(201).json({
            user
        })
    } catch (error) {
        next(error)
    }
}

exports.getCurrentUser = async (req, res, next) => {
    try {
        res.status(200).json({
            user: req.user
        })
    } catch (error) {
        next(error)
    }
}

exports.updateCurrentUser = async (req, res, next) => {
    try {
        res.send('put /users/login')
    } catch (error) {
        next(error)
    }
}
