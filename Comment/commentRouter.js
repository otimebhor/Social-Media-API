const express = require('express');
const { protect } = require('../middlewares/authorization');
const { createComment } = require('./commentController');

const router = express.Router();

router.post('/:post_id', protect, createComment);





const CommentRouter = router;

module.exports = { CommentRouter };