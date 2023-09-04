const express = require("express");
const { Assignment } = require("../models/assignment.model");
const { Course } = require("../models/course.model");
const { Enrollment } = require("../models/enrollment.model");
const { Student } = require("../models/student.model");
const { Submission } = require("../models/submissions.model");
const { sequelize } = require("../configs/db");
const { Sequelize } = require("sequelize");
const assignmentRouter = express.Router();
const { authentication } = require("../middlewares/authentication.middleware");
const { authorize } = require("../middlewares/authorization.middleware");

assignmentRouter.use(authentication);

// post an assignment
assignmentRouter.post(
  "/api/assignment",
  authorize(["instructor"]),
  async (req, res) => {
    try {
      const { title, description, due_date, course_id } = req.body;
      const assignment = await Assignment.create({
        title,
        description,
        due_date,
        course_id,
      });
      res.json(assignment);
    } catch (err) {
      console.error(err);
      res.send({ error: err.message });
    }
  }
);

// get an assignment
assignmentRouter.get(
  "/api/assignment/:id",
  authorize(["student", "instructor", "admin"]),
  async (req, res) => {
    try {
      const query = `
              SELECT a.*, s.submission_date, s.status, s.submittedData
              FROM assignments a
              LEFT JOIN (
                  SELECT assignment_id, MAX(submission_date) AS latest_submission_date
                  FROM submissions
                  WHERE assignment_id = :assignmentId
                  GROUP BY assignment_id
              ) ls ON a.id = ls.assignment_id
              LEFT JOIN submissions s ON a.id = s.assignment_id AND s.submission_date = ls.latest_submission_date
              WHERE a.id = :assignmentId;
        `;
      const assignment = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { assignmentId: req.params.id },
      });

      if (!assignment)
        return res.status(404).json({ message: "No assignment found!" });

      return res.json(assignment);
    } catch (error) {
      console.log("Error fetching assignment:".error);
      return res.status(500).json({ error: error.message });
    }
  }
);

module.exports = {
  assignmentRouter,
};
