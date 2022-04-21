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
    let latestTransaction =
      account.transactions[account.transactions.length - 1];
    res.status(201).json(latestTransaction);
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

  amount = req.body.amount;

  try {
    const user = await User.findOne({ email });
    const account = user.accounts.find(
      (account) => account.title === accountTitle
    );
    let transaction = account.transactions.find((transaction) => {
      // if (transaction.type === "Expense") {
      //   account.amount += transaction.amount;
      //   account.amount -= amount;
      // } else if (transaction.type === "Income") {
      //   account.amount -= transaction.amount;
      //   account.amount += amount;
      // }
      return transaction._id.equals(id);
    });
    oldAmount = transaction.amount;
    oldType = transaction.type;
    transaction.type = req.body.type ?? transaction.type;
    transaction.title = req.body.title ?? transaction.title;
    transaction.category = req.body.category ?? transaction.category;
    transaction.amount = amount ?? transaction.amount;
    transaction.date = req.body.date ?? transaction.date;
    transaction.payee = req.body.payee ?? transaction.payee;
    transaction.description = req.body.description ?? transaction.description;
    if (oldType === transaction.type) {
      if (transaction.type === "Expense") {
        account.amount = new Decimal(account.amount).plus(oldAmount).toNumber();
        account.amount = new Decimal(account.amount).minus(amount).toNumber();
      } else if (transaction.type === "Income") {
        account.amount = new Decimal(account.amount)
          .minus(oldAmount)
          .toNumber();
        account.amount = new Decimal(account.amount).plus(amount).toNumber();
      }
    } else {
      if (transaction.type === "Expense") {
        account.amount = new Decimal(account.amount)
          .minus(oldAmount)
          .toNumber();
        account.amount = new Decimal(account.amount).minus(amount).toNumber();
      } else if (transaction.type === "Income") {
        account.amount = new Decimal(account.amount).plus(oldAmount).toNumber();
        account.amount = new Decimal(account.amount).plus(amount).toNumber();
      }
    }

    await user.save();

    res.status(201).json(transaction);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const email = req.query.email;
  const accountTitle = req.query.accountTitle;
  const id = req.params.id;

  try {
    const user = await User.findOne({ email });
    const account = user.accounts.find(
      (account) => account.title === accountTitle
    );
    let transaction = account.transactions.find((transaction) => {
      return transaction._id.equals(id);
    });
    if (transaction.type === "Expense") {
      account.amount += transaction.amount;
    } else if (transaction.type === "Income") {
      account.amount -= transaction.amount;
    }
    account.transactions = account.transactions.filter((transaction) => {
      return !transaction._id.equals(id);
    });
    await user.save();

    res.status(201).json("successfully deleted");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
