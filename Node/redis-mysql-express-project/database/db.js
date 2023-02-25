const password = require('./pswd.js');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'mylo',
 'root',
 password,
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

module.exports=sequelize;