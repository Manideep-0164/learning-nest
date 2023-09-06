const express = require("express");
const { Assignment } = require("../models/assignment.model");
const { Course } = require("../models/course.model");
const { Enrollment } = require("../models/enrollment.model");
const { Student } = require("../models/student.model");
const { Submission } = require("../models/submissions.model");
const { sequelize } = require("../configs/db");
const { Sequelize } = require("sequelize");
const { Instructor } = require("../models/instructor.model");
const { Department } = require("../models/department.model");
const { authentication } = require("../middlewares/authentication.middleware");
const { authorize } = require("../middlewares/authorization.middleware");
const departmentRouter = express.Router();
const { client } = require("../configs/redis");

departmentRouter.post(
  "/api/department",
  authentication,
  authorize(["admin"]),
  async (req, res) => {
    try {
      const { name } = req.body;
      const deptData = await Department.create({
        name,
      });
      res.json({ "Department Created": deptData });
    } catch (err) {
      console.error("Error fetching departments:", err);
      res.send({ error: err.message });
    }
  }
);

// get courses along with depts
departmentRouter.get("/api/department/courses", async (req, res) => {
  try {
    Department.hasMany(Course, { foreignKey: "dept_id" });
    Course.belongsTo(Department, { foreignKey: "dept_id" });

    const cache = await client.get("dept/courses");

    if (cache !== null) return res.json(JSON.parse(cache));

    const departmentCourses = await Department.findAll({
      attributes: ["name"],
      include: {
        model: Course,
        as: "courses",
        attributes: ["id", "name", "description"],
      },
    });

    await client.set(
      "dept/courses",
      JSON.stringify(departmentCourses),
      "EX",
      3600
    );
    res.json(departmentCourses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.send({ error: err.message });
  }
});

module.exports = {
  departmentRouter,
};
