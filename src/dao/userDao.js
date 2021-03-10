const User = require('../model/user').User;

exports.save = userDetails => {
    let user = new User({
        name: userDetails.name,
        surname: userDetails.surname,
        email: userDetails.email,
        password: userDetails.password,
    });
    return user.save();
}

exports.findByEmail = (email, action) => {
    User.findOne({email: email},  (err, res) => {
        action(err, res)
    })
}

exports.existsByEmail = email => {
    return User.exists({email: email});
}

exports.findById = id => {
    return User.findById(id);
}

exports.updateById = (id, data,action) => {
    User.findByIdAndUpdate({_id:id}, data, {upsert: true}, (err, doc) => {
        action(err,doc)
    });
}

exports.deleteById = (id, action) => {
    User.findByIdAndDelete(id,   {},(err, doc) => {
        action(err,doc)
    });
}

exports.findByChunk = (chunk,action) => {
    let regExp = new RegExp(`^${chunk}`,'i');
    return User.aggregate([{$match: {name: regExp}}], (err, res) => {
        action(err, res)
    })
}
