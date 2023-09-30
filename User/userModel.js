const { Sequelize,Model, DataTypes } = require("sequelize");

const DB = require("../database");

const UserModel = DB.define('user', {
   first_name: {
        type: DataTypes.STRING,
        validate: {
            min: 2,
        }
    },
    last_name: {
        type: DataTypes.STRING,
        validate: {
            min: 2,
        }
    },
    username: {
        type: DataTypes.STRING,
        unique: {
            name: "username",
            msg: "An account already exists with this username."
        },
        validate: {
            is: /^[a-zA-Z0-9._-]{3,16}$/i,
            notEmpty: {
              msg: "Username cannot be empty",
            },
          },
    },
    email: {
        type: DataTypes.STRING,
        unique: {
            name: "email",
            msg: "An account already exists with this email address.",
          },
    
          validate: {
            isEmail: { msg: "Please check this is a valid email" },
            notEmpty: { msg: "email can't be empty" },
          },
    },
    phone_number: {
        type: DataTypes.STRING,
        validate: {
            isNumeric: {
              msg: "Please confirm phone number contains valid characters",
            },
          },

    },
    password: {
        type: DataTypes.STRING,
    },
   date_of_birth: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.ENUM({
            values: [
                "male",
                "female",
            ]
        })
    }

});




UserModel.sync({ alter: true }).then(() => {
    console.log('User table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
 module.exports = { UserModel }