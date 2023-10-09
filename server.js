const app = require("./app");
const { PORT } = require("./config");

const DB = require("./database");


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





