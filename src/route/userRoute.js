const route = require('express').Router();
const {auth} = require('../middlewear/auth');
const userController = require('../controller/user/userController');
const postController = require('../controller/post/postController');


exports.route = route
    .get('/:id', userController.getById)
    .get('/search/:token', auth,userController.searchByChunk)

    .get('/:uid/posts',auth,postController.getAllPostsByUserId)
    .get('/:uid/posts/:id',auth,postController.getByIdAndUserId)
    .post('/posts',auth,postController.addPost)

    .put('/posts/:id',auth,postController.updatePostById)
    .delete('/posts/:id',auth,postController.deletePostById)
    .get('/posts/:id',auth,postController.getById)

    .put('/',auth,userController.updateUser)
    .delete('/',auth,userController.deleteUser)

