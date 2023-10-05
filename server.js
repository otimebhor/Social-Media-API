const app = require("./app");

const DB = require("./database");

const { PORT } = require("./config");





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