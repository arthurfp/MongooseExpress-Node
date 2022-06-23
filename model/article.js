const mongoose = require('mongoose')
const baseModel = require('./base-model')

const articleSchema = new mongoose.Schema({
    ...baseModel
})

exports.exports = articleSchema