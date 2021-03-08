const route = require('express').Router();
const passport = require('passport');
const postController = require('../controller/post/postController');

route.get('/',postController.getAll)
     .get('/users',passport.authenticate('jwt',{session:false}),postController.getAllByCreatorId)
     .get('/:id',postController.getById)
     .get('/search/:token',postController.searchByChunk)

module.exports = route;
