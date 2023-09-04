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

module.exports = {
  announcementRouter,
};
