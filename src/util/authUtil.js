const jwt = require('jsonwebtoken')

exports.getJwtDecodedPayloadFromRequest = req => {
    let token = req.get('Authorization');
    if (token && token.startsWith('Bearer ')){
        return  jwt.verify(token.replace('Bearer ',''), process.env.SECRET);
    }
    return null;

}

