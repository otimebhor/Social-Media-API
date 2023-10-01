const { PostModel } = require("../Post/postModel");



const createComment = async (req, res) => {
    const { comment } = req.body;
    const post_id  = req.params.id;
    const user = req.user;

    const post = await PostModel.findByPk(post_id);


    if (!post) {
      return res.status(404).json("Post does not exist");
    }
    const newComment = await Comment.create({
      comment,
      post_id,
      user_id: req.user.id,
    });

    if (newComment){
        res.status(200).json({
            status: "Success",
            newComment

        })
    }

    

    
  };


module.exports = { createComment };

