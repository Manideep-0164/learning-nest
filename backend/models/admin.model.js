const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");

const Admin = sequelize.define(
  "admins",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin"],
      defaultValue: "admin",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Admin };
