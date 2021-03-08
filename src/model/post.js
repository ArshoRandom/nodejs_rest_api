const mongoose = require('../util/mongoose');

const Schema = mongoose.Schema;

let schema = new Schema(
    {
        title: {
            type: String,
        },
        text: {
            type: String
        },
        creatorId: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        images: [
            {
                name: String,
                content: String,
                mimetype:String,
            }
        ]
    }
);

module.exports.Post = mongoose.model('Post',schema);

