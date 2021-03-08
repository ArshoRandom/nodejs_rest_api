const userService = require('../../service/userService')
const jwtUtil = require('../../util/jwtUtil')
const handleError = require('../../util/errorHandler');

module.exports.getById = (req,res) => {
    let promise = userService.getUserById(req.params.id);
    promise.then(e => {
        res.status(200).send(e);
    }).catch(err => handleError(res,err))
}

module.exports.updateUser = (req, res) => {
    let decoded = jwtUtil.getPayloadFromRequest(req)

    userService.updateById(decoded.userId, req.body)
        .then((mess) => res.status(200).send(mess))
        .catch(err => handleError(res,err,422))
}

module.exports.deleteUser = (req, res) => {
    let decoded = jwtUtil.getPayloadFromRequest(req);

    userService.deleteById(decoded.userId)
        .then(() => {
            res.status(200).send(`Successfully deleted user with id = ${decoded.userId}`)
        })
        .catch(err => handleError(res,err,404))
}

module.exports.searchByChunk = (req, res) => {

    let chunk = req.params.token;
    if (!chunk || chunk.trim().length === 0) {
        handleError(res,new Error('Empty search chunk'),400)
    }else {
        userService.search(chunk)
            .then(async promises => {
                let results = await Promise.all(promises)
                res.status(200).send(results);
            })
            .catch(err => handleError(res, err))
    }
}
