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

// delete an assignment
assignmentRouter.delete(
  "/api/assignment/:id",
  authorize(["instructor", "admin"]),
  async (req, res) => {
    try {
      const isAssignmentExist = await Assignment.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!isAssignmentExist)
        return res.status(404).json({ message: "Assignment does not exist." });

      await Assignment.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.json({ message: "Assignment Deleted." });
    } catch (err) {
      console.error("Error fetching assignments:", err);
      res.send({ error: err.message });
    }
  }
);

// update an assignment
assignmentRouter.patch(
  "/api/assignment/:id",
  authorize(["instructor", "admin"]),
  async (req, res) => {
    try {
      const updatedAssignment = req.body;

      if (updatedAssignment.id)
        return res.json({ message: "Exclude the assignment id!" });

      const isAssignmentExist = await Assignment.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!isAssignmentExist)
        return res.status(404).json({ message: "Assignment does not exist." });

      await Assignment.update(updatedAssignment, {
        where: {
          id: req.params.id,
        },
      });
      res.json({ message: "Assignment Updated." });
    } catch (err) {
      console.error("Error fetching assignments:", err);
      res.send({ error: err.message });
    }
  }
);

// -- get the assignments of a specific course(id)
assignmentRouter.get(
  "/api/assignment/course/:id",
  authorize(["student", "instructor", "admin"]),
  async (req, res) => {
    try {
      Course.hasMany(Assignment, { foreignKey: "course_id" });
      Assignment.belongsTo(Course, { foreignKey: "course_id" });

      const assignmentsData = await Assignment.findAll({
        attributes: ["id", "title", "description", "due_date"],
        include: [
          {
            model: Course,
            attributes: ["name"],
            as: "course",
            where: {
              id: req.params.id,
            },
          },
        ],
      });

      if (!assignmentsData.length)
        return res.json({ message: "No assignments available" });

      res.json(assignmentsData);
    } catch (err) {
      console.error("Error fetching assignment:", err);
      res.send({ error: err.message });
    }
  }
);

// -- get all the assignments and submissions of a specific student(id)
assignmentRouter.get(
  "/api/assignment/student/:id",
  authorize(["student", "instructor", "admin"]),
  async (req, res) => {
    try {
      Student.hasMany(Enrollment, { foreignKey: "student_id" });
      Enrollment.belongsTo(Student, { foreignKey: "student_id" });

      Student.hasMany(Submission, { foreignKey: "student_id" });
      Submission.belongsTo(Student, { foreignKey: "student_id" });

      Course.hasMany(Enrollment, { foreignKey: "course_id" });
      Enrollment.belongsTo(Course, { foreignKey: "course_id" });

      Course.hasMany(Assignment, { foreignKey: "course_id" });
      Assignment.belongsTo(Course, { foreignKey: "course_id" });

      const query = `
              SELECT a.*, c.name AS course, sb.submission_date, sb.status
              FROM assignments a
              JOIN courses c ON a.course_id = c.id
              JOIN enrollments e ON c.id = e.course_id
              JOIN students s ON e.student_id = s.id
              LEFT JOIN (
                  SELECT assignment_id, student_id, MAX(submission_date) AS latest_submission_date
                  FROM submissions
                  GROUP BY assignment_id, student_id
              ) ls ON a.id = ls.assignment_id AND s.id = ls.student_id
              LEFT JOIN submissions sb ON ls.assignment_id = sb.assignment_id AND ls.student_id = sb.student_id AND ls.latest_submission_date = sb.submission_date
              WHERE s.id = :studentId
          `;

      const studentAssignmentData = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { studentId: req.params.id }, // Replace with the actual student ID
      });

      if (studentAssignmentData.length === 0)
        return res.json({
          message: "You did not have any assignments!",
        });

      res.json(studentAssignmentData);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      res.send({ error: err.message });
    }
  }
);

module.exports = {
  assignmentRouter,
};
