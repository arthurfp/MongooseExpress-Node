const util = require('util');

module.exports = () => (err, req, res, next) => {
  res.status(500).json({
    error: util.format(err),
  });
};
