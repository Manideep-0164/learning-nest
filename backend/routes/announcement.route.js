const express = require("express");
const announcementRouter = express.Router();
require("dotenv").config();
const { authentication } = require("../middlewares/authentication.middleware");
const { authorize } = require("../middlewares/authorization.middleware");
const { Announcement } = require("../models/announcements.model");
const { sequelize } = require("../configs/db");
const { Sequelize } = require("sequelize");

// get announcements based on department id
announcementRouter.get(
  "/api/announcement/department/:id",
  authentication,
  authorize(["admin", "instructor", "student"]),
  async (req, res) => {
    try {
      const query = `
      SELECT a.*, d.name as department
      FROM announcements a
      JOIN departments d ON a.department_id = d.id
      WHERE d.id = :departmentID;
    `;

      const announcements = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { departmentID: req.params.id }, // Replace with the actual department ID
      });

      if (announcements.length === 0)
        return res.json({
          message: "No announcements found.",
        });

      res.json(announcements);
    } catch (err) {
      console.error("Error fetching announcement:", err);
      res.send({ error: err.message });
    }
  }
);

// get announcements based on course id
announcementRouter.get(
  "/api/announcement/course/:id",
  authentication,
  authorize(["admin", "instructor", "student"]),
  async (req, res) => {
    try {
      const query = `
        SELECT a.*, c.name as course
        FROM announcements a
        JOIN courses c ON a.course_id = c.id
        WHERE c.id = :courseID;
      `;

      const announcements = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { courseID: req.params.id }, // Replace with the actual course ID
      });

      if (announcements.length === 0)
        return res.json({
          message: "No announcements found.",
        });

      res.json(announcements);
    } catch (err) {
      console.error("Error fetching announcement:", err);
      res.send({ error: err.message });
    }
  }
);

// get all announcements
announcementRouter.get(
  "/api/announcement",
  authentication,
  authorize(["student", "instructor", "admin"]),
  async (req, res) => {
    try {
      const announcements = await Announcement.findAll({});
      if (announcements.length === 0)
        return res.json({ message: "No announcements found." });

      res.json(announcements);
    } catch (error) {}
  }
);

// get the announcements based on the student enrolled courses using student id
announcementRouter.get(
  "/api/announcement/student/:id",
  authentication,
  authorize(["student", "instructor", "admin"]),
  async (req, res) => {
    try {
      const { id } = req.params;

      const query = `
        SELECT a.*
        FROM announcements a
        JOIN courses c ON c.id = a.course_id
        JOIN enrollments e ON e.course_id = c.id
        JOIN students s ON s.id = e.student_id
        WHERE s.id = :studentId;
    `;

      const announcementsOfStudentCourses = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { studentId: id },
      });

      if (announcementsOfStudentCourses.length === 0)
        return res.status(404).json({ message: "No announcements found." });

      return res.json(announcementsOfStudentCourses);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

announcementRouter.get(
  "/api/announcement/:id",
  authentication,
  authorize(["student", "instructor", "admin"]),
  async (req, res) => {
    try {
      const announcement = await Announcement.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!announcement)
        return res.json({ message: "announcement does not exist." });

      res.json(announcement);
    } catch (error) {
      console.error("Error fetching announcement:", error);
      res.send({ error: error.message });
    }
  }
);

announcementRouter.post(
  "/api/announcement",
  authentication,
  authorize(["admin", "instructor"]),
  async (req, res) => {
    try {
      const { title, description, publish_date, course_id, department_id } =
        req.body;

      if (!course_id && !department_id)
        return res.json({
          message: "Must provide course_id or department_id!",
        });

      const announcement = await Announcement.create({
        title,
        description,
        publish_date,
        course_id,
        department_id,
      });

      res.json({ message: "Announcement posted.", announcement });
    } catch (err) {
      console.error("Error fetching announcement:", err);
      res.send({ error: err.message });
    }
  }
);

module.exports = {
  announcementRouter,
};
