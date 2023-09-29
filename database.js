const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = require('./config');


const  Sequelize = require('sequelize');

const DB = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD,{
  host: DB_HOST,
  dialect: 'mysql'});



module.exports =  DB 