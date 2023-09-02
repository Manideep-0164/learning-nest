const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");
const { Course } = require("./course.model");

const Assignment = sequelize.define(
  "assignments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Assignment };
