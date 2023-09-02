const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");

const Student = sequelize.define(
  "students",
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
    gender: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Male", "Female", "Others"],
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    major: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [
        "Applied Sciences",
        "Fine Arts",
        "Environmental Engineering",
        "Biotechnology",
        "Electronics",
        "Engineering",
        "Computer Science",
      ],
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    contact_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["student"],
      defaultValue: "student",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Student };
