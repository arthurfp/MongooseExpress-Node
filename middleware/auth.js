const { verify } = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const { User } = require('../model')

module.exports = async (req, res, next) => {
    // Get the token data from the request header
    let token = req.headers['authentication']
    token = token ? token.split('Bearer ')[1] : null
    if (!token) {
        return res.status(401).end()
    }

    try {
        const decodedToken = await verify(token, jwtSecret) // return default data and issuance time
        req.user = await User.findById(decodedToken.userId) // find data based on id
        next()
    } catch (error) {
        return res.status(401).end()
    }
    // Token verification:
    // invalid -> respond with 401 status code
    // valid -> read the user information and mount it to the req request object to continue execution
}
