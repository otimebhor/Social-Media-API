
const { PostModel } = require("./postModel")


// create new post
const createPost = async (req, res) => {
    const { title, content } = req.body;
   
    const user = req.user;

    const newPost = await PostModel.create({ title: title, content: content, user_id: user.id});

    if (newPost) {
        return res.status(201).json({
            message: "Post was created successfully",
            title: title,
            content: content
        })
    } else {
        return res.status(400).json({
            message: "Post cannot be created."
        })
    }
};

// read all posts
const getPosts = async(req, res) => {
    const posts = await PostModel.findAll();

    return res.status(200).json(posts)
};

// read a single post
const singlePost = async (req, res) => {
    const post_id = req.params.id;

    // check if post exist

    const post = await PostModel.findOne({where: {id: post_id}});

    if (!post) {
        return res.status(404).json({error: "Post not found"})
    };

    return res.status(200).json(post);
}

const editPost = async (req, res) => {
   const user = req.user;
   const post_id = req.params.id;
   const { title, content } = req.body;

   //check if post exist

   let post = await PostModel.findByPk(post_id);

   if (post){
    // check if user is authorized to edit post
    if (user.id != post.user_id){
        return res.status(401).json("You are not allowed to perform this action.")
    };


    let updated = await PostModel.update({ title, content }, {where: {id: post_id}})

    if (updated) {
        post = await PostModel.findByPk(post_id);

        return res.status(200).json({
            message: "Post updated successfully.", 
            post
            
    })
    } else{
        return res.status(401).json("Post was not updated.")
    }



   }else {
    return res.status(404).json("Post not found")
   }

};

const deletePost = async (req, res) => {
     const user = req.user;
     const post_id = req.params.id;

     // check if post exist

    let post = await PostModel.findByPk(post_id);

    if (post) {
        // check if user is authorized 
        if (user.id != post.user_id) {
            return res.status(401).json("You are not allowed to perform this action.")
        };
        let deleted = await PostModel.destroy( {where: {id: post_id}} )

        if (deleted) {
    
            return res.status(200).json({
                message: "Post deleted successfully."
                
        })

        

    } else {
        return res.status(404).json("Post not found.")
    }

};
};
    

module.exports = { createPost, getPosts, singlePost, editPost, deletePost }