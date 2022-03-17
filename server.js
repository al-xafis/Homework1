const express = require("express");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const countriesRouter = require("./routes/countries");
const authRouter = require("./routes/auth");

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

app.use("/", authRouter);
app.use("/countries", countriesRouter);

app.listen(port, () => {
  console.log("Server is running at port: " + port);
});
