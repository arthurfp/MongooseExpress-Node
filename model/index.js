const mongoose = require('mongoose')
const { dbUri } = require('../config/config.default')

mongoose.connect(dbUri)

const db = mongoose.connection;

db.on('error', err => {
    console.log('MongoDB Database connection failed', err);
});

db.once('open', function () {
    console.log('MongoDB Database connection succeeded');
});

module.exports = {
    User: mongoose.model('User', require('./user')),
    Article: mongoose.model('Article', require('./article'))
}
