const { User } = require('../model')

exports.login = async (req, res, next) => {
    try {
        res.send('post /users/login')
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
        res.send('post /users/login')
    } catch (error) {
        next(error)
    }
}

exports.updateCurrentUser = async (req, res, next) => {
    try {
        res.send('post /users/login')
    } catch (error) {
        next(error)
    }
}
