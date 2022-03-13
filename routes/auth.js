const express = require("express");
const { auth } = require("../passport");
const { adminGuard } = require("../middlewares/guard");
const { users, loginUser, registerUser } = require("../database");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = loginUser(username, password);

  if (user) {
    const token = jwt.sign({ username: user.username }, process.env.TOKEN_KEY, {
      expiresIn: process.env.EXPIRE,
    });
    res.status(200).json({
      username: user.username,
      token: `Bearer ${token}`,
    });
  } else {
    res.status(401).json({ message: "Error in login" });
  }
});

router.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  registerUser({ username, password, role });

  res.json(users);
});

router.get("/users", auth, adminGuard, (req, res) => {
  res.json(users);
});

module.exports = router;
