const { UserModel } = require("../User/userModel");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRE, JWT_SECRET } = require("../config");

 // create signed jwt token
const getSignedJwtToken = function (user) {
    return jwt.sign( { id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
  };

const userSignup = async (req, res) => {
  // get user input
  const {
    first_name,
    last_name,
    username,
    email,
    phone_number,
    password,
    date_of_birth,
    gender
  } = req.body;

  //   validate user input
  if (!first_name || !last_name || !username || !email || !phone_number || !password || !date_of_birth || !gender) {
    return res.status(400).json({
      status: "fail",
      msg: "please enter the necessary fields",
    });
  }

  // check if user already exist

  const checkUser = await UserModel.findOne({
    where: {
      [Op.or]: [{ email: email }, { phone_number: phone_number }, { username: username}],
    },
    raw: true,
  });

  if (checkUser) {
    if (checkUser.email == email) {
      return res.status(400).json({
        status: "fail",
        data: "Email already exist",
      });
    } else if (checkUser.phone_number == phone_number) {
      return res.status(400).json({
        status: "fail",
        data: "Phone Number already exist",
      });
    } else if (checkUser.username == username){
      return res.status(400).json({
        status: "fail",
        data: "Username already exist",
      });
    }
  };
  //hashing password

  const hashedPassword = bcrypt.hashSync(password, 10);
  // create new user
  const newUser = await UserModel.create({
    first_name: first_name,
    last_name: last_name,
    username : username,
    email: email,
    phone_number: phone_number,
    password: hashedPassword,
    date_of_birth : date_of_birth,
    gender : gender,
  });

  
  // create token
  const token = getSignedJwtToken(newUser);

  res.status(201).json({
    message: "User successfully created",
    data: newUser,
    token,
  });
  
};

const userLogin = async (req, res) => {
  // get user input
  const { email, password } = req.body;

  // validate user input
  if (!email && !password) {
    return res.status(404).json({
      status: "fail",
      msg: "please enter the necessary fields",
    });
  }

  // check if user exists
  const user = await UserModel.findOne({
    where: { email: email },
  });
  if (!user) {
    return res.status(404).json({
      status: "fail",
      msg: "user does not exist",
    });
  }

  // compare user password against hashed password
  const userPassword = await bcrypt.compare(password, user.password);
  if (user && userPassword) {
    //generate token
    const token = getSignedJwtToken(user);

    res.status(200).json({
      message: "Login successful",
       user,
      token,
    });
  }

  // check for correct password

  if (!userPassword) {
    return res.status(404).json({
      status: "fail",
      msg: "Email or password is not correct.",
    });
  }
}
;

module.exports = { userSignup , userLogin};
