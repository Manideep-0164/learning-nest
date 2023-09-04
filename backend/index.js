const express = require("express");
const { sequelize } = require("./configs/db");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const { instructorRouter } = require("./routes/instructor.route");
const { courseRouter } = require("./routes/course.route");
const { enrollmentRouter } = require("./routes/enrollment.route");

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

sequelize
  .sync()
  .then(() => {
    app.listen(1400, async () => {
      console.log("Connected to DB");
      console.log("Server is running at 1400");
    });
  })
  .catch((err) => {
    console.log(err);
  });
