const express = require('express');
const { createPost, getPosts, singlePost, editPost, deletePost } = require('./postController');
const { CreatePostValidation, EditPostValidation } = require('../middlewares/postValidation');
const { protect } = require("../middlewares/authorization")

const router = express.Router();


router.post('/create-post', CreatePostValidation, protect, createPost) // create a new post
router.get('/',  getPosts) // get all posts
router.get('/:id',  singlePost) // get all posts
router.patch('/edit-post/:id', EditPostValidation, protect, editPost) // edit a post
router.delete('/:id', protect, deletePost) // delete a post


const PostRouter = router;

module.exports = { PostRouter };