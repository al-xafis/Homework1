const express = require("express");
const mongoose = require("mongoose");
const Decimal = require("decimal.js");

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
    if (type === "Expense") {
      account.amount = new Decimal(account.amount).minus(amount).toNumber();
    } else if (type === "Income") {
      account.amount = new Decimal(account.amount).plus(amount).toNumber();
    }

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

router.put("/:id", async (req, res) => {
  const email = req.query.email;
  const accountTitle = req.query.accountTitle;
  const id = req.params.id;

  const amount = req.body.amount;

  try {
    const user = await User.findOne({ email });
    const account = user.accounts.find(
      (account) => account.title === accountTitle
    );
    let transaction = account.transactions.find((transaction) => {
      if (transaction.type === "Expense") {
        account.amount += transaction.amount;
        account.amount -= amount;
      } else if (transaction.type === "Income") {
        account.amount -= transaction.amount;
        account.amount += amount;
      }
      return transaction._id.equals(id);
    });
    console.log(transaction);

    transaction.amount = amount;

    user.save();

    res.status(201).json("successfully edited");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const email = req.query.email;
  const accountTitle = req.query.accountTitle;
  const id = req.params.id;
  console.log(id);

  try {
    const user = await User.findOne({ email });
    const account = user.accounts.find(
      (account) => account.title === accountTitle
    );

    account.transactions = account.transactions.filter((transaction) => {
      if (transaction.type === "Expense") {
        account.amount -= transaction.amount;
      } else if (transaction.type === "Income") {
        account.amount += transaction.amount;
      }
      return !transaction._id.equals(id);
    });
    console.log(account.transactions);
    user.save();

    res.status(201).json("successfully deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
