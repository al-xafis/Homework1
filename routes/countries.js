const express = require("express");
const { auth } = require("../passport");
const { adminGuard } = require("../middlewares/guard");

const router = express.Router();

let countries = [
  {
    name: "Uzbekistan",
    capital: "Tashkent",
    population: 34_000_000,
  },
  {
    name: "Belarus",
    capital: "Minsk",
    population: 9_000_000,
  },
  {
    name: "Australia",
    capital: "Canberra",
    population: 25_000_000,
  },
];

router.get("/", auth, (req, res) => {
  res.status(200).send(countries);
});

router.post("/", auth, (req, res) => {
  const name = req.body.name;
  const capital = req.body.capital;
  const population = req.body.population;
  const resultObj = { name, capital, population };

  countries.push(resultObj);

  res.status(201).send(countries);
});

router.put("/:name", auth, (req, res) => {
  let qname = req.params.name;
  let name = req.body.name;
  let capital = req.body.capital;
  let population = req.body.population;

  let resultObj = { name, capital, population };
  let index = countries.findIndex((c) => c.name === qname);

  if (index === -1) {
    res.status(404).send("No such country in the list");
    return;
  }

  countries[index] = resultObj;

  res.status(200).send(countries);
});

router.delete("/:name", auth, adminGuard, (req, res) => {
  let index = countries.findIndex((c) => c.name === req.params.name);

  if (index === -1) {
    res.status(404).send("No such country in the list");
    return;
  }
  countries.splice(index, 1);
  res.status(202).send(countries);
});

module.exports = router;
