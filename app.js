const express = require("express");
const { PORT } = require("./config");
const DB = require("./database");
// const userRouter = require("./Users/userRouter");
const { AuthRouter } = require("./Auth/authRouter");
const { PostRouter } = require("./Post/postRouter");
const { CommentRouter } = require("./Comment/commentRouter");

const app = express();

app.use(express.json());


// Routes
app.use('/api/auth', AuthRouter);
app.use('/api/posts', PostRouter);
app.use('/api/comments', CommentRouter);



module.exports = app ;