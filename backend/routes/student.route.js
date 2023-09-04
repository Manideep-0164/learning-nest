const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const studentRouter = express.Router();
const { sequelize } = require("../configs/db");
const { Student } = require("../models/student.model");
const { Sequelize } = require("sequelize");
const { Enrollment } = require("../models/enrollment.model");
const { Course } = require("../models/course.model");
const { Instructor } = require("../models/instructor.model");
const { authentication } = require("../middlewares/authentication.middleware");
const { authorize } = require("../middlewares/authorization.middleware");

// get all students
studentRouter.get(
  "/api/student",
  authentication,
  authorize(["admin"]),
  async (req, res) => {
    try {
      const studentsData = await Student.findAll({});

      res.json(studentsData);
    } catch (err) {
      console.error("Error fetching students:", err);
      res.send({ error: err.message });
    }
  }
);

studentRouter.post("/api/student/signup", async (req, res) => {
  try {
    const { name, dob, major, gender, contact_number, email, password } =
      req.body;

    const studentExist = await Student.findOne({ where: { email: email } });
    if (studentExist)
      return res.json({ message: "Already Registered. Please login" });

    const hashedPassword = bcrypt.hashSync(password, 5);

    const studentsData = await Student.create({
      name,
      gender,
      dob,
      major,
      email,
      contact_number,
      password: hashedPassword,
    });

    res.json({ "Student Created": studentsData });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.send({ error: err.message });
  }
});

studentRouter.post("/api/student/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const studentExist = await Student.findOne({ where: { email: email } });
    if (!studentExist)
      return res.json({ message: "User does not exist, Please Register!" });

    const passwordMatch = bcrypt.compareSync(password, studentExist.password);

    if (!passwordMatch)
      return res.json({ message: "Invalid credentials, Please try again!" });

    const payload = {
      role: studentExist.role,
      id: studentExist.id,
      email: studentExist.email,
    };
    const token = jwt.sign(payload, process.env.STUDENT_SECRET, {
      expiresIn: "12H",
    });

    res.json({
      message: "Login Success",
      token: token,
      name: studentExist.name,
      id: studentExist.id,
    });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.send({ error: err.message });
  }
});

// -- Obtain the list of students who are part of a course that has been assigned to an instructor.
studentRouter.get(
  "/api/student/course/instructor/:id",
  authentication,
  authorize(["instructor", "admin"]),
  async (req, res) => {
    try {
      Student.hasMany(Enrollment, { foreignKey: "student_id" });
      Enrollment.belongsTo(Student, { foreignKey: "student_id" });

      Course.hasMany(Enrollment, { foreignKey: "course_id" });
      Enrollment.belongsTo(Course, { foreignKey: "course_id" });

      Course.hasOne(Instructor, { foreignKey: "course_id" });
      Instructor.belongsTo(Course, { foreignKey: "course_id" });

      const query = `
        SELECT s.name, s.gender, s.major, s.contact_number, c.name as course
        FROM students s
        JOIN enrollments e ON s.id = e.student_id
        JOIN courses c ON e.course_id = c.id
        JOIN instructors i ON c.id = i.course_id
        WHERE i.id = :instructorID
    `;

      const students = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { instructorID: req.params.id },
      });

      if (students.length === 0)
        return res.json({ message: "No students enrolled to this course." });

      return res.json(students);
    } catch (error) {
      console.log("Error fetching the students:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = {
  studentRouter,
};
