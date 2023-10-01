const { Sequelize,Model, DataTypes } = require("sequelize");

const DB = require("../database");
const { UserModel } = require("../User/userModel");
const { PostModel } = require("../Post/postModel")

const CommentModel = DB.define('comment', {
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please provide the comment content",
          },
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
          field: 'user_id'
        },
        allowNull: false,
      },
      post_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Posts",
          },
          key: "id",
          field: 'post_id'
        },
        allowNull: false,
    }

  

});

UserModel.hasMany(CommentModel, {
    foreignKey: 'user_id',
  });
CommentModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
});

PostModel.hasMany(CommentModel, {
    foreignKey: 'post_id',
  });
CommentModel.belongsTo( PostModel, {
    foreignKey: 'post_id',
});




CommentModel.sync({ alter: force }).then(() => {
    console.log('Comment table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
 module.exports = { CommentModel }