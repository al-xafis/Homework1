const express = require("express");
const { auth } = require("../passport");
const Account = require("../models/accounts");
const User = require("../models/users");

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, currency, description } = req.body;
  const email = req.query.email;

  try {
    const user = await User.findOne({ email });
    user.accounts.push({
      title: title,
      amount: 0,
      currency: currency,
      description: description,
    });
    await user.save();

    res.status(201).json(user.accounts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
  const email = req.query.email;

  try {
    const user = await User.findOne({ email });

    res.status(201).json(user.accounts);
  } catch (err) {
    console.log(email);
    res.status(400).json(err);
  }
});

module.exports = router;
