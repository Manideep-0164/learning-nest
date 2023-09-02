const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.json({ message: "Please provide token" });

    const decodedToken = jwt.decode(token);
    const role = decodedToken?.role;
    let secretKey;

    switch (role) {
      case "student":
        secretKey = process.env.STUDENT_SECRET;
        break;
      case "instructor":
        secretKey = process.env.INSTRUCTOR_SECRET;
        break;
      case "admin":
        secretKey = process.env.ADMIN_SECRET;
        break;
      default:
        break;
      // return res.json({ message: "Invalid role" });
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        if (err.message === "jwt expired")
          return res.json({ message: "Session expired, Please login." });

        console.log(err, err.message);

        return res.json({
          message: "Something went wrong, Please try again later.",
        });
      }

      req.role = decoded.role;
      //   req.student_id = decoded.id;

      next();
    });
  } catch (error) {
    console.error(error);
    res.send({ error: error?.message });
  }
};

module.exports = {
  authentication,
};
