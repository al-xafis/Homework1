const express = require("express");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const mongoose = require("mongoose");
const countriesRouter = require("./routes/countries");
const authRouter = require("./routes/auth");

mongoose.connect(process.env.MONGOURI, () => {
  console.log("connected to DB");
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

app.use("/", authRouter);
app.use("/countries", countriesRouter);

module.exports = { app };
