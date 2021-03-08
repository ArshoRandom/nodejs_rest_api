const jwt = require('jsonwebtoken');
const service = require('../../service/userService');
const {compare} = require('../../util/passwordUtil');
const handleError = require('../../util/errorHandler');

module.exports.login = async (req, res) => {
    try {
        const user = await service.getUserByEmail(req.body.email);
        if (!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }
        if (!compare(req.body.password, user.password)) {
            res.status(401).json({message: 'Invalid password'});
            return;
        }
        const token = jwt.sign({
            email: user.email,
            userId: user._id
        }, process.env.SECRET, {expiresIn: 2 * 60 * 60})
        res.status(200).json({token: token})
    } catch (e) {
        handleError(res, e)
    }
}

module.exports.register = async (req, res) => {
    try {
        let exists = await service.checkUser(req.body.email);
        if (!exists) {
            let id = await service.addUser(req.body);
            res.status(201).json({id: id});
        } else {
            res.status(409).json({message: 'User already exists'});
        }
    } catch (e) {
        handleError(res, e)
    }
}

