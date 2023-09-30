
const { UserModel } = require("../User/userModel");
const { PostModel } = require("./postModel")
const { Op } = require("sequelize");


// create new post
const createPost = async (req, res) => {
    const { title, content } = req.body;
    req.user
    const user = req.user

    //find user 
    // const user = await UserModel.findByPk(userId);
    
    // if(!user){
    //     res.status(404).json("User not found")
    // }
    const newPost = await PostModel.create({ title: title, content: content, userId: user.id});

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


module.exports = { createPost };