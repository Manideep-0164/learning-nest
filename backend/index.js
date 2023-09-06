const express = require("express");
const { sequelize } = require("./configs/db");
const { client } = require("./configs/redis");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const { instructorRouter } = require("./routes/instructor.route");
const { courseRouter } = require("./routes/course.route");
const { enrollmentRouter } = require("./routes/enrollment.route");
const { assignmentRouter } = require("./routes/assignment.route");
const { submissionRouter } = require("./routes/submission.route");
const { announcementRouter } = require("./routes/announcement.route");

const app = express();

app.use(express.json());
app.use(require("cors")());

app.get("/", async (req, res) => {
  try {
    res.json({ message: "Server is Working" });
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
});

app.use("", courseRouter);
app.use("", instructorRouter);
app.use("", enrollmentRouter);
app.use("", submissionRouter);
app.use("", announcementRouter);

app.use("", assignmentRouter);

client.connect();

client.on("connect", async () => {
  console.log("Connected to redis");
  try {
    await sequelize.sync();
    console.log("Connected to DB");
    app.listen(1400, async () => {
      console.log("Server is running at 1400");
    });
  } catch (error) {
    console.error("Error during Sequelize sync or server listening:", err);
  }
});

client.on("error", (err) => {
  console.log("Redis error =>", err);
});

module.exports = app;
