const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { UserModel } = require("../User/userModel");

exports.protect = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // token in Header
      token = req.headers.authorization.split(" ")[1];
    }else{
      return res.status(400).json({
        message:"You are not authenticated"
      })
    }
  
    if (!token) {
        return res.status(400).json({
            message:"Unauthorized"
          })
    }
    try {
        const decodedData = jwt.verify(token, JWT_SECRET);
        console.log(decodedData)
        
        const userDetails  = await UserModel.findByPk(decodedData.id);
        
        // console.log(userDetails)
         req.user = userDetails
          next();
        
       } catch (error) {
        return   res.status(400).json({
            message:"Unauthorized"
          })
        
       }
          
        
      };
    

