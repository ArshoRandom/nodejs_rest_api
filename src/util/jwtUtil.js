const jwt = require('jsonwebtoken')

module.exports.getPayloadFromRequest = req => {
    let token = req.get('Authorization')
    return  jwt.verify(token.replace('Bearer ',''), process.env.SECRET);
}

