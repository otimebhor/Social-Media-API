const { Sequelize,Model, DataTypes } = require("sequelize");

const DB = require("../database");
const { UserModel } = require("../User/userModel")

const PostModel = DB.define('post', {
    title: {
        type: Sequelize.STRING(120),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please provide the post title",
          },
        },
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please provide the post content",
          },
        },
      },
  

});

UserModel.hasMany(PostModel);
PostModel.belongsTo(UserModel);




PostModel.sync({ alter: true }).then(() => {
    console.log('Post table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
 module.exports = { PostModel }