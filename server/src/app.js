const express = require("express");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const accountRouter = require("./routes/account");
const transactionRouter = require("./routes/transaction");
const categoriesRouter = require("./routes/categories");
const subscriptionRouter = require("./routes/subscription");

mongoose.connect(process.env.MONGOURI, () => {
  console.log("connected to DB");
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

app.use("/", authRouter);

app.use("/account", accountRouter);

app.use("/transaction", transactionRouter);

app.use("/categories", categoriesRouter);

app.use("/subscription", subscriptionRouter);

module.exports = { app };
