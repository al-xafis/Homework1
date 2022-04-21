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
    user.accounts.map((account) => {
      if (account.title.toLowerCase() === title.toLowerCase()) {
        throw new Error("Account already exists");
      }
    });
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

router.put("/:title", async (req, res) => {
  const oldTitle = req.params.title;
  const { title, currency, description } = req.body;
  const email = req.query.email;

  try {
    const user = await User.findOne({ email });
    const account = user.accounts.find((account) => account.title === oldTitle);
    user.account.map((account) => {
      if (account.title.toLowerCase() === title.toLowerCase()) {
        throw new Error("Account already exists");
      }
    });
    account.title = title;
    account.currency = currency;
    account.description = description;
    await user.save();

    res.status(201).json(user.accounts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:title", async (req, res) => {
  const email = req.query.email;
  const title = req.params.title;

  try {
    const user = await User.findOne({ email });
    const account = user.accounts.findIndex(
      (account) => account.title === title
    );
    user.accounts.splice(account, 1);
    await user.save();
    res.status(201).json(user.accounts);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
