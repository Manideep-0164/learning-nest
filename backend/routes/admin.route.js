const express = require("express");
const adminRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { authentication } = require("../middlewares/authentication.middleware");
const { authorize } = require("../middlewares/authorization.middleware");
const { Admin } = require("../models/admin.model");

adminRouter.post("/api/admin/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const adminExist = await Admin.findOne({ where: { email: email } });
    if (adminExist)
      return res.json({ message: "Already Registered. Please login!" });

    const hashedPassword = bcrypt.hashSync(password, 5);

    const adminsData = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ message: "Register Success" });
  } catch (err) {
    console.error("Error fetching admin:", err);
    res.send({ error: err.message });
  }
});

adminRouter.post("/api/admin/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminExist = await Admin.findOne({ where: { email: email } });
    if (!adminExist)
      return res.json({ message: "User does not exist, Please Register!" });

    const passwordMatch = bcrypt.compareSync(password, adminExist.password);

    if (!passwordMatch)
      return res.json({ message: "Invalid credentials, Please try again!" });

    const payload = {
      role: adminExist.role,
      id: adminExist.id,
      email: adminExist.email,
    };

    const token = jwt.sign(payload, process.env.ADMIN_SECRET, {
      expiresIn: "12H",
    });

    res.json({
      message: "Login Success",
      token: token,
      name: adminExist.name,
      id: adminExist.id,
    });
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.send({ error: err.message });
  }
});

module.exports = {
  adminRouter,
};
