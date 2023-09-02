const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");
const { Student } = require("./student.model");
const { Course } = require("./course.model");

const Enrollment = sequelize.define(
  "enrollments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: "id",
      },
    },
    enroll_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Enrollment };
