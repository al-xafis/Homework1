const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { auth } = require("../passport");
const { adminGuard } = require("../middlewares/guard");
const User = require("../models/users");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ email: user.email }, process.env.TOKEN_KEY, {
        expiresIn: process.env.EXPIRE,
      });
      console.log(process.env.EXPIRE);

      res.status(200).json({
        email: user.email,
        token: `Bearer ${token}`,
        expiresIn: 10 * 60 * 1000,
      });
    } else {
      res.status(401).json({ message: "Incorrect email or password" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password, 10),

      role: req.body.role,
    });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);

    res.status(400).json(err);
  }
});


router.get("/users", auth, async (req, res) => {

  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
