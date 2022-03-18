const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { auth } = require("../passport");
const { adminGuard } = require("../middlewares/guard");
const User = require("../models/users");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { username: user.username },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.EXPIRE,
        }
      );

      res.status(200).json({
        username: user.username,
        token: `Bearer ${token}`,
      });
    } else {
      res.status(401).json({ message: "Error in login" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      age: req.body.age,
      role: req.body.role,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/users", auth, adminGuard, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
