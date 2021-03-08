const postService = require('../service/postService')

module.exports.formatImageData = images => {
    return images.map(e => {
        e.name = `${e.name}.${e.mimetype.split('/')[1]}`;
        e.content = `data:${e.mimetype};base64,${Buffer.from(e.content).toString("base64")}`;
        return e;
    })
}

module.exports.formatFileEntity = files => {
    let entities = [];
    if (files.length) {
        entities = files.map(item => {
            return {
                content: item.data,
                name: +new Date(),
                mimetype: item.mimetype
            } // unique name from Date
        });
    } else {
        entities.push({
            content: files.data,
            name: +new Date(),
            mimetype: files.mimetype
        })
    }
    return entities;
}

module.exports.formatPostEntity = entity => {
    let post = {};
    post.id = entity._id;
    post.title = entity.title;
    post.creatorId = entity.creatorId;
    post.createdAt = entity.createdAt;
    post.text = entity.text;
    post.images = entity.images.map(e => {
        return {id: e._id, name: e.name, mimetype: e.mimetype, content: e.content}
    });
    return post
}

module.exports.formatUserEntity = async entity => {
    let user = {};
    let userPosts = await postService.getAllByCreatorId(entity._id)
    user.name = entity.name;
    user.surname = entity.surname;
    user.email = entity.email;
    user.posts = userPosts.map(e => {
        return {id: e._id, title: e.title, text: e.text, images: e.images}
    });
    return user;
}
