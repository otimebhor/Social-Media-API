const express = require('express');
const { protect } = require('../middlewares/authorization');
const { createComment, getComments, editComment } = require('./commentController');
const { CreateCommentValidation, EditCommentValidation } = require('../middlewares/commentValidation');


const router = express.Router();

router.post('/:post_id', CreateCommentValidation, protect, createComment);
router.get('/:post_id', getComments );
router.patch('/edit-comment/:post_id/:comment_id', EditCommentValidation, protect, editComment );




const CommentRouter = router;

module.exports = { CommentRouter };