const express = require("express");
const announcementRouter = express.Router();
require("dotenv").config();
const { authentication } = require("../middlewares/authentication.middleware");
const { authorize } = require("../middlewares/authorization.middleware");
const { Announcement } = require("../models/announcements.model");
const { sequelize } = require("../configs/db");
const { Sequelize } = require("sequelize");

announcementRouter.post(
  "/api/announcement",
  authentication,
  authorize(["admin"]),
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

module.exports = {
  announcementRouter,
};
