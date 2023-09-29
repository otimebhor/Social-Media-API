const express = require("express");

const DB = require("./database");
// const userRouter = require("./Users/userRouter");
const { authRoutes } = require("./Auth/authRouter");

const PORT = 4005;
const app = express();

app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);



















// DB connection
DB.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    throw err;
  });
 



//server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`);
});
