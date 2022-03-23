const express = require("express");
const { auth } = require("../passport");
const { adminGuard } = require("../middlewares/guard");
const Country = require("../models/countries");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  let countries = await Country.find();
  res.status(200).send(countries);
});

router.post("/", auth, async (req, res) => {
  const name = req.body.name;
  const capital = req.body.capital;
  const population = req.body.population;

  try {
    await Country.create({ name, capital, population });
    res.status(201).send("Country created");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:name", auth, async (req, res) => {
  let qname = req.params.name;
  let name = req.body.name;
  let capital = req.body.capital;
  let population = req.body.population;

  let resultObj = { name, capital, population };
  try {
    await Country.updateOne({ name: qname }, resultObj, {
      upsert: true,
    });
    res.status(200).send("Updated");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:name", auth, adminGuard, async (req, res) => {
  try {
    const country = await Country.findOne({ name: req.params.name });

    if (country) {
      await Country.deleteOne({ name: req.params.name });
      res.status(200).send("Deleted");
    } else {
      res.status(400).send("No such country");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
