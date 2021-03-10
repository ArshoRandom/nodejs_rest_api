const authUtil = require('../util/authUtil');
exports.auth = (req,res,next) => {
    let payload = authUtil.getJwtDecodedPayloadFromRequest(req);
    if (payload){
        req.authUserId = payload.userId;
        next();
    }else {
        res.status(401).send('Unauthorized')
    }
}
