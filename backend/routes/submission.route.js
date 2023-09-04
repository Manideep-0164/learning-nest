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
const submissionRouter = express.Router();
const { authentication } = require("../middlewares/authentication.middleware");
const { authorize } = require("../middlewares/authorization.middleware");

submissionRouter.post(
  "/api/submission",
  authentication,
  authorize(["student", "instructor"]),
  async (req, res) => {
    try {
      const {
        submission_date,
        status,
        assignment_id,
        student_id,
        submittedData,
      } = req.body;
      const submissions = await Submission.create({
        submission_date,
        status,
        assignment_id,
        student_id,
        submittedData,
      });
      res.json(submissions);
    } catch (err) {
      console.error(err);
      res.send({ error: err.message });
    }
  }
);

module.exports = {
  submissionRouter,
};
