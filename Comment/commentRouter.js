const express = require('express');
const { protect } = require('../middlewares/authorization');
const { createComment, getComments } = require('./commentController');
const { CreateCommentValidation } = require('../middlewares/commentValidation');


const router = express.Router();

router.post('/:post_id', CreateCommentValidation, protect, createComment);
router.get('/:post_id', getComments );





const CommentRouter = router;

module.exports = { CommentRouter };