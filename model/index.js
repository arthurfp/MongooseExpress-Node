const mongoose = require('mongoose')
const { dbUri } = require('../config/config.default')

// Connect to MongoDB database
mongoose.connect(dbUri)

const db = mongoose.connection;

// When the connection fails
db.on('error', err => {
    console.log('MongoDB database connection failed', err);
});

// When the connection is successful
db.once('open', function () {
    console.log('MongoDB database connection succeeded');
});

// Export model class
module.exports = {
    User: mongoose.model('User', require('./user')),
    Article: mongoose.model('Article', require('./article'))
}
