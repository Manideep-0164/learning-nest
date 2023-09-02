const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");
const { Student } = require("./student.model");
const { Assignment } = require("./assignment.model");

const Submission = sequelize.define(
  "submissions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    submittedData: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    submission_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Submitted", "Late Submitted", "Not Submitted"),
      allowNull: false,
    },
    remarks: {
      type: DataTypes.TEXT,
    },
    assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Assignment,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: false, // To exclude default timestamp fields (createdAt, updatedAt)
  }
);

module.exports = { Submission };
