const postService = require('../../service/postService');
const jwtUtil = require('../../util/jwtUtil');
const formatUtil = require('../../util/formatUtil');
const handleError = require('../../util/errorHandler');

module.exports.getAll = (req, res) => {
    postService.getAll()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => handleError(res,err))
}

module.exports.getAllByCreatorId = (req, res) => {
    let currentUserId = jwtUtil.getPayloadFromRequest(req).userId
    postService.getAllByCreatorId(currentUserId)
        .then(results => {
            res.status(200).send(results);
        })
        .catch(err => handleError(res,err))
}

module.exports.getById = (req, res) => {
    postService.getById(req.params.id)
        .then(result => {
            result ? res.status(200).send(result) : res.status(404).send(`Post with id = ${req.params.id} not found`);
        })
        .catch(err => handleError(res,err))
}

module.exports.addPost = (req, res) => {
    let data = req.body;
    let files = req.files;
    data.creatorId = jwtUtil.getPayloadFromRequest(req).userId
    if (files) {
        data.images =formatUtil.formatFileEntity(files.images)
    }
    postService.addPost(data)
        .then(id => {
            id ? res.status(200).send(`Added post with id = ${id}`) : res.status(422).send(`Something is wrong`);
        })
        .catch(err => handleError(res,err))
}

module.exports.updatePostById = (req, res) => {
    let data = req.body;
    let files = req.files;
    let currentUserId = jwtUtil.getPayloadFromRequest(req).userId;
    if (files) {
        data.images = formatUtil.formatFileEntity(files.images)
    }
    postService.updatePostByIdAndCreatorId(req.params.id, currentUserId, data)
        .then(() => {
            res.status(200).send(`Updated post with id = ${req.params.id}`);
        })
        .catch(err => handleError(res,err))
}

module.exports.deletePostById = (req, res) => {
    let currentUserId = jwtUtil.getPayloadFromRequest(req).userId
    postService.deletePostByIdAndCreatorId(req.params.id, currentUserId)
        .then(data => {
            data ? res.status(200).send(`Deleted post with id = ${req.params.id}`) : res.status(404).send(`Post not found id = ${req.params.id}`)
        })
        .catch(err => handleError(res,err,404))
}

module.exports.getAllPostsByUserId = (req, res) => {
    postService.getAllByCreatorId(req.params.uid)
        .then(results => {
            res.status(200).send(results);
        })
        .catch(err => handleError(res,err))
}

module.exports.getByIdAndUserId = (req, res) => {
    postService.getByIdAndCreatorId(req.params.id, req.params.uid)
        .then(byId => {
            byId ? res.status(200).send(byId) : res.status(404).send(`Post with id = ${req.params.id} not found`);
        })
        .catch(err => handleError(res,err))
}

module.exports.searchByChunk = (req,res) => {
    let chunk = req.params.token;
    if (!chunk || chunk.trim().length === 0) {
       handleError(res,new Error('Empty search chunk'),400)
    }else {
        postService.search(chunk)
            .then(result => {
                res.status(200).send(result);
            })
            .catch(err => handleError(res, err))
    }
}
