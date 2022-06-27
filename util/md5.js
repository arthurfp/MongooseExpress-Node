const crypto = require('crypto')

module.exports = str => {
    return crypto.createHash('md5') // create hash object
        .update('cx' + str) // plaintext to be encrypted; to prevent it from being cracked, it can be mixed with private key (custom data) or encrypted twice
        .digest('hex') // convert to decimal
}
