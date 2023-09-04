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
const enrollmentRouter = express.Router();

// enrollments
enrollmentRouter.post(
  "/api/enrollment",
  authentication,
  authorize(["student"]),
  async (req, res) => {
    try {
      const { enroll_date, student_id, course_id } = req.body;
      const enrollMents = await Enrollment.create({
        enroll_date,
        student_id,
        course_id,
      });
      res.json(enrollMents);
    } catch (err) {
      console.error(err);
      res.send({ error: err.message });
    }
  }
);

module.exports = {
  enrollmentRouter,
};
