
const  { Sequelize } = require('sequelize');

const db = new Sequelize("sqlite::memory:")


  module.exports =  { db };









// const { testDbName, testDbUser, testDbPassword, DB_HOST } = require('./config');


// const  { Sequelize } = require('sequelize');

// const DB = new Sequelize(testDbName, testDbUser, testDbPassword,{
//   host: DB_HOST,
//   dialect: 'sqlite',
//   storage
//    });


//   module.exports =  { DB };