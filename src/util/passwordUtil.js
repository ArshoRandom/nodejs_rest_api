const bcrypt = require('bcryptjs');

exports.encode = password => {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password,salt);
}

exports.compare = (password, hash) => {
    return bcrypt.compareSync(password,hash);
}

