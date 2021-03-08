const bcrypt = require('bcryptjs');

module.exports.encode = password => {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password,salt);
}

module.exports.compare = (password, hash) => {
    return bcrypt.compareSync(password,hash);
}

