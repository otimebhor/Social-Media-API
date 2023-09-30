const express = require('express');
const { createPost } = require('./postController');
const { CreatePostValidation } = require('../middlewares/postValidation');
const { bearerTokenAuth } = require("../middlewares/authorization")

const router = express.Router();

router.use(bearerTokenAuth);

router.post('/create-post', CreatePostValidation, createPost) // create a new user
// router.post('/login', LoginValidation, userLogin) // user login


const PostRouter = router;

module.exports = { PostRouter };