const { User } = require('../model');
const jwt = require('../util/jwt');
const { jwtSecret } = require('../config/config.default');

// User login
exports.login = async (req, res, next) => {
  try {
    // 1. Get request body data
    // 2. Data validation
    // 3. Generate token
    const user = req.user.toJSON();
    const token = await jwt.sign(
      {
        userId: user.id,
      },
      jwtSecret,
      {
        expiresIn: 60 * 60 * 24, // Set the token expiration time (seconds), if not set, it will be permanently valid
      }
    );

    // 4. Send a successful response (user information containing token)
    delete user.password;
    res.status(200).json({
      ...user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// User registration
exports.register = async (req, res, next) => {
  try {
    // 1. Get request body data
    // 2. Data validation
    // 2.1 Basic data validation
    // 2.2 Business data validation

    // 3. Passing the validation, save the data to the database
    let user = new User(req.body.user);

    // save to database
    await user.save();

    user = user.toJSON();

    delete user.password;

    // 4. Send success response
    res.status(201).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Get the currently logged in user
exports.getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// Update the currently logged in user
exports.updateCurrentUser = async (req, res, next) => {
  try {
    // process the request
    res.send('put /users/login');
  } catch (error) {
    next(error);
  }
};
