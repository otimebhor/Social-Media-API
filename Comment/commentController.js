const { PostModel } = require("../Post/postModel");
const { CommentModel } = require("./commentModel");
const { Op } = require("sequelize");



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

// edit a comment
const editComment = async(req, res) => {
    const user = req.user;
    const { comment_id} = req.params;
    const { post_id } = req.params;
    const { content } = req.body;

    // find post
    const post = await PostModel.findOne({
        where: { id: post_id }
    })
    //find comment of current user 

    let comment = await CommentModel.findOne({
    where: { [Op.and]: [{ user_id: user.id}, {id: comment_id} ]}
   });

   if (!comment){
    return res.status(401).json("Sorry, you cannot perform this action.")
   };

    if (post){
        // update comment
        let updated = await CommentModel.update({content},
             { where: { id: comment_id }} );
            
        if (updated) {
            comment = await CommentModel.findByPk(comment_id, 
               {include:[
                    { model: PostModel,
                        attributes: {
                            exclude: [ "createdAt", "updatedAt" ]
                        }
                    
                    }
                ]}
                );
            return res.status(200).json({
                message: "Comment updated successfully.", 
                comment})
        }else{
            return res.status(401).json("Unable to update comment.")
        };
    
    
    
    }else {
        return res.status(404).json("Post not found.")
    };



};

const deleteComment = async (req, res) => {
    const user = req.user;
    const { comment_id} = req.params;
    const { post_id } = req.params;

    // find post
    const post = await PostModel.findOne({
        where: { id: post_id }
    })
    //find comment of current user 

    let comment = await CommentModel.findOne({
    where: { [Op.and]: [{ user_id: user.id}, {id: comment_id} ]}
   });

   if (!comment){
    return res.status(401).json("Sorry, you cannot perform this action.")
   };

    if (post){
        // delete comment
        let deleted = await CommentModel.destroy(
             { where: { id: comment_id }} );
            
        if (deleted) {
            
            return res.status(200).json({
                message: "Comment deleted successfully.", 
            })
            };
    
    }else {
        return res.status(404).json("Post not found.")
    };

};



module.exports = { createComment, getComments, editComment, deleteComment }
