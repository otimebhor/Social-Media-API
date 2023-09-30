const express = require('express');
const { createPost, getPosts, singlePost } = require('./postController');
const { CreatePostValidation } = require('../middlewares/postValidation');
const { bearerTokenAuth } = require("../middlewares/authorization")

const router = express.Router();

router.use(bearerTokenAuth);

router.post('/create-post', CreatePostValidation, createPost) // create a new post
router.get('/',  getPosts) // get all posts
router.get('/:id',  singlePost) // get all posts


const PostRouter = router;

module.exports = { PostRouter };