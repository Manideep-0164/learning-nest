const { Sequelize } = require("sequelize");
// import Sequelize from "sequelize";
// import mysql2 from "mysql2";
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    // dialectModule: mysql2,
  }
);

module.exports = {
  sequelize,
};
