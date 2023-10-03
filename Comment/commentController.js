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





















// const editComment = async (req, res) => {
//     const user = req.user;
//    const post_id = req.params.id;
//    const { title, content } = req.body;

//    //check if post exist

//    let post = await PostModel.findByPk(post_id);

//    if (post){
//     // check if user is authorized to edit post
//     if (user.id != post.user_id){
//         return res.status(401).json("You are not allowed to perform this action.")
//     };


//     let updated = await PostModel.update({ title, content }, {where: {id: post_id}})

//     if (updated) {
//         post = await PostModel.findByPk(post_id);

//         return res.status(200).json({
//             message: "Post updated successfully.", 
//             post
            
//     })
//     } else{
//         return res.status(401).json("Post was not updated.")
//     }



//    }else {
//     return res.status(404).json("Post not found")
//    }
// }


  
     
 
 


module.exports = { createComment, getComments, editComment };

