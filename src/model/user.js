const mongoose = require('../util/mongoose');

const Schema = mongoose.Schema;

let schema = new Schema(
    {
        name: {
            type: String,
        },
        surname: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            minlength: 5
        }
    }
);

module.exports.User = mongoose.model('User',schema);

