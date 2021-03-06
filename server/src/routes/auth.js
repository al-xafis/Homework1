const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { auth } = require("../passport");
const { adminGuard } = require("../middlewares/guard");
const User = require("../models/users");
const Category = require("../models/categories");

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
        expiresIn: 3600 * 1000,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
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
    let defaultCategories = [
      { type: "Expense", title: "Food" },
      { type: "Expense", title: "Transportation" },
      { type: "Expense", title: "Housing" },
      { type: "Expense", title: "Education" },
      { type: "Expense", title: "Shopping" },
      { type: "Expense", title: "Kids" },
      { type: "Expense", title: "Entertainment" },
      { type: "Expense", title: "Health and beauty" },
      { type: "Expense", title: "Pet" },
      { type: "Expense", title: "Internet" },
      { type: "Expense", title: "Mobile" },
      { type: "Income", title: "Salary" },
      { type: "Income", title: "Debt repayment" },
      { type: "Income", title: "Gift" },
      { type: "Income", title: "Rental income" },
      { type: "Income", title: "Premium/bonus" },
    ];

    const user = await User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password, 10),
      role: req.body.role,
      categories: defaultCategories,
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
