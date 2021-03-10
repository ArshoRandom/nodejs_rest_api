const jwt = require('jsonwebtoken')

exports.getPayloadFromRequest = req => {
    let token = req.get('Authorization')
    return  jwt.verify(token.replace('Bearer ',''), process.env.SECRET);
}

