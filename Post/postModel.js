const { Sequelize,Model, DataTypes } = require("sequelize");

const DB = require("../database");
const { UserModel } = require("../User/userModel")

const PostModel = DB.define('post', {
    title: {
        type: Sequelize.STRING,
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
      }

  

});

UserModel.hasMany(PostModel, {
    foreignKey: 'user_id',
  });
PostModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
});





PostModel.sync({ alter: true }).then(() => {
    console.log('Post table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
 module.exports = { PostModel }