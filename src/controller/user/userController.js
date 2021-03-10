const userService = require('../../service/userService')
const handleError = require('../../util/errorHandler').handler;

exports.getById = async (req, res) => {
    try {
        let result = await userService.getUserById(req.params.id);
        res.status(200).send(result);
    } catch (err) {
        handleError(res, err);
    }
}

exports.updateUser = async (req, res) => {
    try {
        let currentUserId = req.authUserId;
        let result = await userService.updateById(currentUserId, req.body);
        res.status(200).send(result)
    } catch (err) {
        handleError(res, err, 422);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let currentUserId = req.authUserId;
        await userService.deleteById(currentUserId);
        res.status(200).send(`Successfully deleted user with id = ${currentUserId}`);
    } catch (err) {
        handleError(res, err, 404);
    }
}

exports.searchByChunk = async (req, res) => {
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
