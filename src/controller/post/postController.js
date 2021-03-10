const postService = require('../../service/postService');
const jwtUtil = require('../../util/jwtUtil');
const formatUtil = require('../../util/formatUtil');
const handleError = require('../../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try{
        let result = await postService.getAll();
        res.status(200).send(result);
    }catch (err){
        handleError(res,err)
    }
}

module.exports.getAllByCreatorId = async (req, res) => {
    try{
        let currentUserId = jwtUtil.getPayloadFromRequest(req).userId
        let result = await postService.getAllByCreatorId(currentUserId);
        res.status(200).send(result);
    }catch (err){
        handleError(res,err)
    }
}

module.exports.getById = async (req, res) => {
    try{
        let result = await postService.getById(req.params.id);
        result ? res.status(200).send(result) : res.status(404).send(`Post with id = ${req.params.id} not found`);
    }catch (err){
        handleError(res,err)
    }
}

module.exports.addPost = async (req, res) => {
    try{
        let data = req.body;
        let files = req.files;
        data.creatorId = jwtUtil.getPayloadFromRequest(req).userId
        if (files) {
            data.images =formatUtil.formatFileEntity(files.images)
        }
        let id = await  postService.addPost(data);
        id ? res.status(200).send(`Added post with id = ${id}`) : res.status(422).send(`Something is wrong`);
    }catch (err){
        handleError(res,err)
    }
}

module.exports.updatePostById = async (req, res) => {
    try{
        let data = req.body;
        let files = req.files;
        let currentUserId = jwtUtil.getPayloadFromRequest(req).userId;
        if (files) {
            data.images = formatUtil.formatFileEntity(files.images)
        }
        await  postService.updatePostByIdAndCreatorId(req.params.id, currentUserId, data);
        res.status(200).send(`Updated post with id = ${req.params.id}`);
    }catch (err){
        handleError(res,err)
    }
}

module.exports.deletePostById = async (req, res) => {
    try{
        let currentUserId = jwtUtil.getPayloadFromRequest(req).userId
        let result = await postService.deletePostByIdAndCreatorId(req.params.id, currentUserId);
        result ? res.status(200).send(`Deleted post with id = ${req.params.id}`) : res.status(404).send(`Post not found id = ${req.params.id}`)
    }catch (err){
        handleError(res,err,404)
    }
}

module.exports.getAllPostsByUserId = async (req, res) => {
    try{
        let result = await postService.getAllByCreatorId(req.params.uid);
        res.status(200).send(result);
    }catch (err){
        handleError(res,err)
    }
}

module.exports.getByIdAndUserId = async (req, res) => {
    try{
        let result = await postService.getByIdAndCreatorId(req.params.id, req.params.uid);
        result ? res.status(200).send(result) : res.status(404).send(`Post with id = ${req.params.id} not found`);
    }catch (err){
        handleError(res,err)
    }
}

module.exports.searchByChunk = async (req,res) => {
    let chunk = req.params.token;
    if (!chunk || chunk.trim().length === 0) {
       handleError(res,new Error('Empty search chunk'),400)
    }else {
        try{
            let result = await  postService.search(chunk);
            res.status(200).send(result);
        }catch (err){
            handleError(res,err)
        }
    }
}
