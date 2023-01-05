const express = require('express');

const router = express.Router();

// Get tags
router.get('/', async (req, res, next) => {
  try {
    // process the request
    res.send('get /tags');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
