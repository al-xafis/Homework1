const express = require("express");
const countriesRouter = require("./routes/countries");

const app = express();
app.use(express.json());

app.use("/countries", countriesRouter);

app.listen(3000);
