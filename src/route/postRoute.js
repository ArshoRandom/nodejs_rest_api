const route = require('express').Router();
const {auth} = require('../middlewear/auth');
const postController = require('../controller/post/postController');

exports.route = route.get('/',postController.getAll)
     .get('/users',auth,postController.getAllByCreatorId)
     .get('/:id',postController.getById)
     .get('/search/:token',postController.searchByChunk)

