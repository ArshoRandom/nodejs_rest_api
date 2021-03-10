const userService = require('../../service/userService')
const jwtUtil = require('../../util/jwtUtil')
const handleError = require('../../util/errorHandler');

module.exports.getById = async (req, res) => {
    try {
        let result = await userService.getUserById(req.params.id);
        res.status(200).send(result);
    } catch (err) {
        handleError(res, err);
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        let decoded = jwtUtil.getPayloadFromRequest(req)
        let result = await userService.updateById(decoded.userId, req.body);
        res.status(200).send(result)
    } catch (err) {
        handleError(res, err, 422);
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        let decoded = jwtUtil.getPayloadFromRequest(req)
        await userService.deleteById(decoded.userId);
        res.status(200).send(`Successfully deleted user with id = ${decoded.userId}`);
    } catch (err) {
        handleError(res, err, 404);
    }
}

module.exports.searchByChunk = async (req, res) => {
    let chunk = req.params.token;
    if (!chunk || chunk.trim().length === 0) {
        handleError(res, new Error('Empty search chunk'), 400)
    } else {
        try {
            let result = await userService.search(chunk);
            let results = await Promise.all(result);
            res.status(200).send(results);
        } catch (err) {
            handleError(res, err)
        }


    }
}
