const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");
const { Department } = require("./department.model");
const { Course } = require("./course.model");

const Announcement = sequelize.define(
  "announcements",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publish_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Course,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Department,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: false, // To exclude default timestamp fields (createdAt, updatedAt)
  }
);

module.exports = {
  Announcement,
};
