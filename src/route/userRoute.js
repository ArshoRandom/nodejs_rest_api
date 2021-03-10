const route = require('express').Router();
const passport = require('passport');
const userController = require('../controller/user/userController');
const postController = require('../controller/post/postController');

function _authenticate(){
    return passport.authenticate('jwt',{session:false});
}

exports.route = route
    .get('/:id', userController.getById)
    .get('/search/:token', _authenticate(),userController.searchByChunk)

    .get('/:uid/posts',_authenticate(),postController.getAllPostsByUserId)
    .get('/:uid/posts/:id',_authenticate(),postController.getByIdAndUserId)
    .post('/posts',_authenticate(),postController.addPost)

    .put('/posts/:id',_authenticate(),postController.updatePostById)
    .delete('/posts/:id',_authenticate(),postController.deletePostById)
    .get('/posts/:id',_authenticate(),postController.getById)

    .put('/',_authenticate(),userController.updateUser)
    .delete('/',_authenticate(),userController.deleteUser)

