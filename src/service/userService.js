const {promisify} = require('util');
const dao = require('../dao/userDao');
const {encode} = require('../util/passwordUtil');
const formatUtil = require('../util/formatUtil');
const postService = require('./postService');

exports.addUser = async userDetails => {
    userDetails.password = encode(userDetails.password);
    return (await dao.save(userDetails))._id;
}

exports.getUserByEmail = async email => {
    return await promisify(dao.findByEmail)(email);
}

exports.checkUser = async email => {
    return await dao.existsByEmail(email);
}

exports.getUserById = async id => {
    let data = dao.findById(id).exec();
    return await formatUtil.formatUserEntity(data);
}

exports.updateById = async (id, data) => {
    for (const dataKey in data) {
        if (dataKey !== 'password' && dataKey !== 'name' && dataKey !== 'surname') {
            throw new Error('Invalid format')
        }
    }
    try {
        if (data.password){
            if (data.password.trim().length >= 5){
                data.password = encode(data.password);
            }else {
                return `Password length must be more than 5`
            }
        }
        await promisify(dao.updateById)(id,data);
        return `Successfully updated user id = ${id}`
    }catch (e) {
        throw e;
    }
}

exports.deleteById = async id => {
    await promisify(dao.deleteById)(id);
    await postService.deleteAllByCreatorId(id);
}

exports.search = async (chunk) => {
    let results = await promisify(dao.findByChunk)(chunk);
    return results.map(await formatUtil.formatUserEntity)
}



