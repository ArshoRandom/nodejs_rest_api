const {promisify} = require('util');
const dao = require('../dao/postDao');
const formatUtil = require('../util/formatUtil');

module.exports.addPost = async postDetails => {
    postDetails.images = formatUtil.formatImageData(postDetails.images);
    return (await dao.save(postDetails))._id;
}

module.exports.getAllByCreatorId = async creatorId => {
    let results = await promisify(dao.findAllByCreatorId)(creatorId);
    return results.map(formatUtil.formatPostEntity)
}

module.exports.getById = async id => {
    let data = await dao.findById(id).lean().exec();
    return formatUtil.formatPostEntity(data)
}

module.exports.getAll = async () => {
    let results = await promisify(dao.findAll)();
    return results.map(formatUtil.formatPostEntity)
}

module.exports.updatePostByIdAndCreatorId = async (id, currentUserId, data) => {
    for (const key in data) {
        if (key !== 'title' && key !== 'images' && key !== 'text' && key !== 'deletableImageId') {
            throw new Error(`Invalid format : ${key}`)
        }
    }
    try {
        if (data.images) {
            let oldDate = await this.getById(id);
            data.images = oldDate.images.concat(formatUtil.formatImageData(data.images));
        }
        if (data.deletableImageId) {
            let oldDate = await this.getById(id);
            data.images = oldDate.images.filter(item => item.id.toString() !== data.deletableImageId);
        }
        await promisify(dao.updatePostByIdAndCreatorId)(id, currentUserId, data);

    } catch (e) {
        throw e
    }
}

module.exports.deletePostByIdAndCreatorId = async (id, currentUserId) => {
    try {
        return await promisify(dao.deletePostByIdAndCreatorId)(id, currentUserId);
    } catch (e) {
        throw e
    }
}

module.exports.deleteAllByCreatorId = async id => {
    await promisify(dao.deleteAllByCreatorId)(id);
}

module.exports.getByIdAndCreatorId = async (id, creatorId) => {
    let data = await promisify(dao.findByIdAndCreatorId)(id, creatorId);
    return formatUtil.formatPostEntity(data)
}

module.exports.search = async (chunk) => {
    let results = await promisify(dao.findByChunk)(chunk);
    return results.map(formatUtil.formatPostEntity)
}




