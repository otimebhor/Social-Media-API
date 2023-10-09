// const { testDbName, testDbUser, testDbPassword, DB_HOST } = require('./config');


const  { Sequelize } = require('sequelize');

const db = new Sequelize("sqlite::memory:")

// try {
//   await db.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

  module.exports =  { db };









// const { testDbName, testDbUser, testDbPassword, DB_HOST } = require('./config');


// const  { Sequelize } = require('sequelize');

// const DB = new Sequelize(testDbName, testDbUser, testDbPassword,{
//   host: DB_HOST,
//   dialect: 'sqlite',
//   storage
//    });


//   module.exports =  { DB };