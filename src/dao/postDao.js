const Post = (require('../model/post')).Post;

exports.save = postDetails => {
    let post = new Post({
        title: postDetails.title,
        text: postDetails.text,
        creatorId: postDetails.creatorId,
        createdAt: postDetails.createdAt,
        images: postDetails.images
    });
    return post.save();
}

exports.findByCreatorId = (id, action) => {
    Post.findOne({creatorId: id},  (err, res) => {
        action(err, res)
    })
}

exports.findByIdAndCreatorId = (id, creatorId, action) => {
    Post.findOne({_id: id, creatorId: creatorId},  (err, res) => {
        action(err, res)
    })
}

exports.findAllByCreatorId = (creatorId, action) => {
    Post.find({creatorId: creatorId}, (err, res) => {
        action(err, res)
    })
}

exports.findAll = action => {
    Post.find({}, (err, res) => {
        action(err, res)
    })
}

exports.findById = id => {
    return Post.findById(id);
}

exports.updatePostByIdAndCreatorId = (id, creatorId, body,action) => {
    Post.findOneAndUpdate({_id: id, creatorId: creatorId},body,{upsert:true},(err, doc) => {
        action(err,doc)
    });
};

exports.deletePostByIdAndCreatorId = (id, creatorId,action) => {
    Post.findOneAndDelete({_id: id, creatorId: creatorId},{},(err, doc) => {
        action(err,doc)
    });
};

exports.deleteAllByCreatorId = (id,action) => {
    Post.deleteMany({creatorId: id},{},(err, doc) => {
        action(err,doc)
    });
}

exports.findByChunk = (chunk,action) => {
    let regExp = new RegExp(`^${chunk}`,'i');
    return Post.aggregate([{$match: {title: regExp}}], (err, res) => {
        action(err, res)
    })
}

