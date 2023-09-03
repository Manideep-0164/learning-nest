const express = require("express");
const { Assignment } = require("../model/assignment.model");
const { Course } = require("../model/course.model");
const { Enrollment } = require("../model/enrollment.model");
const { Student } = require("../model/student.model");
const { Submission } = require("../model/submissions.model");
const { sequelize } = require("../configs/db");
const { Sequelize } = require("sequelize");
const { Instructor } = require("../model/instructor.model");
const courseRouter = express.Router();
const { authorize } = require("../middlewares/authorization.middleware");
const { authentication } = require("../middlewares/authentication.middleware");

courseRouter.get("/api/course", async (req, res) => {
  try {
    const coursesData = await Course.findAll({});
    res.json(coursesData);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.send({ error: err.message });
  }
});

courseRouter.post(
  "/api/course",
  authorize(["instructor", "admin"]),
  async (req, res) => {
    try {
      const { name, description, dept_id, image } = req.body;
      const course = await Course.create({
        name,
        description,
        dept_id,
        image,
      });
      res.json(course);
    } catch (err) {
      console.error(err);
      res.send({ error: err.message });
    }
  }
);

// get specific student's enrolled courses with instrctor.
courseRouter.get(
  "/api/course/enrolled/:id",
  authentication,
  authorize(["student", "admin"]),
  async (req, res) => {
    try {
      Enrollment.belongsTo(Student, { foreignKey: "student_id" });
      Enrollment.belongsTo(Course, { foreignKey: "course_id" });

      Student.hasMany(Enrollment, { foreignKey: "student_id" });
      Course.hasMany(Enrollment, { foreignKey: "course_id" });
      Instructor.belongsTo(Course, { foreignKey: "course_id" });

      const query = `
          SELECT c.*, i.name as instructor
          FROM courses c
          JOIN enrollments e ON c.id = e.course_id
          JOIN students s ON e.student_id = s.id
          JOIN instructors i ON c.id = i.course_id
          WHERE s.id = :studentId
        `;

      const enrollmentData = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { studentId: req.params.id }, // Replace with the actual student ID
      });

      if (enrollmentData.length === 0)
        return res.json({
          message: "You did not enrolled any courses, Please enroll!",
        });

      res.json(enrollmentData);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
      res.send({ error: err.message });
    }
  }
);

module.exports = {
  courseRouter,
};
