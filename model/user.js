const mongoose = require('mongoose')
const baseModel = require('./base-model')
const sha256 = require('../util/sha256')

const userSchema = new mongoose.Schema({
    ...baseModel,
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: value => sha256(value),
        select: false // Do not include this field when querying
    },
    bio: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    }
})

module.exports = userSchema
