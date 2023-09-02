const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");
const { Course } = require("./course.model");

const Instructor = sequelize.define(
  "instructors",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Others"),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contact_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: "id",
      },
    },
    role: {
      type: DataTypes.ENUM("instructor"),
      defaultValue: "instructor",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Instructor };
