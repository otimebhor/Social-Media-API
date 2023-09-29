const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { UserModel } = require("../User/userModel");

const bearerTokenAuth = async (req, res, next) => {
    try{
        const authHeader = req.headers;

        if (!authHeader.authorization) {
            return res.status(401).json({ message: 'You are not authenticated.'})
        }

        const token = authHeader.authorization;

        const decoded = await jwt.verify(token, JWT_SECRET)

        const user = await UserModel.findOne({ id: decoded.id});

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        req.user = user;

        
    } catch (error){
        return res.status(401).json({
    message: "Unauthorized"
})
    }
};