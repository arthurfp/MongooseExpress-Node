const express = require('express');

const router = express.Router();

// User routes
router.use(require('./user'));

// User Profile routes
router.use('/profiles', require('./profile'));

// Article routes
router.use('/articles', require('./article'));

// Tags routes
router.use('/tags', require('./tag'));

module.exports = router;
