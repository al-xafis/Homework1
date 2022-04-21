const express = require("express");
const { auth } = require("../passport");
const Account = require("../models/accounts");
const User = require("../models/users");

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, amount, initialDate, description, lastDate } = req.body;
  const email = req.query.email;
  const accountTitle = req.query.accountTitle;

  try {
    const user = await User.findOne({ email });
    const account = user.accounts.find(
      (account) => account.title === accountTitle
    );
    account.subscriptions.map((subscription) => {
      if (subscription.title.toLowerCase() === title.toLowerCase()) {
        throw new Error("Subscription already exists");
      }
    });
    console.log(account);

    account.subscriptions.push({
      title,
      amount,
      initialDate,
      description,
      lastDate,
    });
    await user.save();
    console.log(account.subscriptions);

    res.status(201).json(account.subscriptions);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
