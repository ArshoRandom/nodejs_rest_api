const {validationResult} = require('express-validator');

exports.authValidate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(422).json({errors: errors.array()});
    };
};
