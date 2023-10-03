const { PostModel } = require("../Post/postModel");
const { CommentModel } = require("./commentModel");




const createComment = async (req, res) => {
    const { content } = req.body;
    const { post_id }  = req.params;
    const user_id = req.user.id;

    const post = await PostModel.findByPk(post_id);


    if (!post) {
      return res.status(404).json("Post does not exist");
    }
    const comment = await CommentModel.create({
      content,
      post_id,
      user_id,
    });

    if (newComment){
        res.status(201).json({
            status: "Success",
            comment

        })
    }

    

  };

// get all comments on a post
const getComments = async(req, res) => {
    const { post_id } = req.params;

    const comments = await CommentModel.findAll({where: {post_id}, 
        include:[
            { model: PostModel,
                attributes: {
                    exclude: [ "createdAt", "updatedAt" ]
                }
            
            }
        ] });

    if(comments){
        return res.status(200).json(comments)
    }else {
        return res.status(404).json("Post not found.")
    }
};






module.exports = { createComment, getComments };

