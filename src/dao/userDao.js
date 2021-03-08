const User = require('../model/user').User;

module.exports.save = userDetails => {
    let user = new User({
        name: userDetails.name,
        surname: userDetails.surname,
        email: userDetails.email,
        password: userDetails.password,
    });
    return user.save();
}

module.exports.findByEmail = (email, action) => {
    User.findOne({email: email},  (err, res) => {
        action(err, res)
    })
}

module.exports.existsByEmail = email => {
    return User.exists({email: email});
}

module.exports.findById = id => {
    return User.findById(id);
}

module.exports.updateById = (id, data,action) => {
    User.findByIdAndUpdate({_id:id}, data, {upsert: true}, (err, doc) => {
        action(err,doc)
    });
}

module.exports.deleteById = (id, action) => {
    User.findByIdAndDelete(id,   {},(err, doc) => {
        action(err,doc)
    });
}

