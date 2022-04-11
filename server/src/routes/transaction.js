const express = require("express");
const mongoose = require("mongoose");

const { auth } = require("../passport");
const User = require("../models/users");

const router = express.Router();

router.post("/", async (req, res) => {
  let { type, title, category, description, amount, payee, date } = req.body;
  const email = req.query.email;
  const accountTitle = req.query.accountTitle;

  if (title == null) {
    title = category[0];
  }

  try {
    const user = await User.findOne({ email });
    const account = user.accounts.find(
      (account) => account.title === accountTitle
    );
    account.transactions.push({
      type,
      title,
      category,
      description,
      amount,
      payee,
      date,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
  const email = req.query.email;
  const accountTitle = req.query.accountTitle;

  try {
    const user = await User.findOne({ email });
    const account = user.accounts.find(
      (account) => account.title === accountTitle
    );

    res.status(201).json(account.transactions);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
