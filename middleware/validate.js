const { validationResult, buildCheckFunction } = require('express-validator');
const { isValidObjectId } = require('mongoose')

// Parallel processing
exports = module.exports = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) { // Whether it is empty
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};

exports.isValidObjectId = (location, fields) => {
    return buildCheckFunction(location)(fields).custom(value => {
        if (!isValidObjectId(value)) {
            
            // sync: failed
            throw new Error('ID is not a valid ObjectId')
        }
        // sync: success
        return true
    })
}
