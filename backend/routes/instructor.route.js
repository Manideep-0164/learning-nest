const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Assignment } = require("../models/assignment.model");
const { Course } = require("../models/course.model");
const { Enrollment } = require("../models/enrollment.model");
const { Student } = require("../models/student.model");
const { Submission } = require("../models/submissions.model");
const { sequelize } = require("../configs/db");
const { Sequelize } = require("sequelize");
const { Instructor } = require("../models/instructor.model");
const { Department } = require("../models/department.model");
const instructorRouter = express.Router();
const { authentication } = require("../middlewares/authentication.middleware");
const { authorize } = require("../middlewares/authorization.middleware");

instructorRouter.get(
  "/api/instructor",
  authentication,
  authorize(["admin"]),
  async (req, res) => {
    try {
      const instructorData = await Instructor.findAll({});
      res.json(instructorData);
    } catch (err) {
      console.error("Error fetching instructors:", err);
      res.send({ error: err.message });
    }
  }
);

instructorRouter.post("/api/instructor/signup", async (req, res) => {
  try {
    const { name, gender, email, contact_number, course_id, password } =
      req.body;

    const instructorExist = await Instructor.findOne({
      where: { email: email },
    });
    if (instructorExist)
      return res.json({ message: "Already Registered. Please login!" });

    const hashedPassword = bcrypt.hashSync(password, 5);

    const instructorInfo = await Instructor.create({
      name,
      gender,
      email,
      contact_number,
      course_id,
      password: hashedPassword,
    });

    res.json({ message: "Successfully Registered", instructorInfo });
  } catch (err) {
    console.error("Error fetching instructors:", err);
    res.send({ error: err.message });
  }
});

instructorRouter.post("/api/instructor/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const instructorExist = await Instructor.findOne({
      where: { email: email },
    });
    if (!instructorExist)
      return res.json({ message: "User does not exist, Please Register!" });

    const passwordMatch = bcrypt.compareSync(
      password,
      instructorExist.password
    );

    if (!passwordMatch)
      return res.json({ message: "Invalid credentials, Please try again!" });

    const payload = {
      role: instructorExist.role,
      id: instructorExist.id,
      email: instructorExist.email,
    };
    const token = jwt.sign(payload, process.env.INSTRUCTOR_SECRET, {
      expiresIn: "1H",
    });

    res.json({
      message: "Login Success",
      token: token,
      name: instructorExist.name,
      id: instructorExist.id,
    });
  } catch (err) {
    console.error("Error fetching instructors:", err);
    res.send({ error: err.message });
  }
});

// get instructor and associated courses
instructorRouter.get(
  "/api/instructor/course",
  authentication,
  authorize(["admin"]),
  async (req, res) => {
    try {
      Course.hasOne(Instructor, { foreignKey: "course_id" });
      Instructor.belongsTo(Course, { foreignKey: "course_id" });

      const instructorData = await Instructor.findAll({
        attributes: [
          ["name", "instructor_name"],
          [sequelize.col("Course.name"), "course_name"],
        ],
        include: [
          {
            model: Course,
            attributes: [],
          },
        ],
      });
      res.json(instructorData);
    } catch (err) {
      console.error("Error fetching instructors:", err);
      res.send({ error: err.message });
    }
  }
);

// -- get all the courses which are not assigned to instructor
instructorRouter.get("/api/instructor/course/available", async (req, res) => {
  try {
    Course.hasOne(Instructor, { foreignKey: "course_id" });
    Instructor.belongsTo(Course, { foreignKey: "course_id" });

    const query = `
          SELECT courses.*
          FROM courses
          LEFT JOIN instructors ON courses.id = instructors.course_id
          WHERE instructors.course_id IS NULL;
        `;

    const coursesAvailableToAssignInstructor = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });

    if (coursesAvailableToAssignInstructor.length === 0)
      return res.json({
        message: "No courses available to enroll!",
      });

    res.json(coursesAvailableToAssignInstructor);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.send({ error: err.message });
  }
});

module.exports = {
  instructorRouter,
};
