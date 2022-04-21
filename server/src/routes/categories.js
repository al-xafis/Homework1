const express = require("express");
const { auth } = require("../passport");
const Account = require("../models/accounts");
const User = require("../models/users");

const router = express.Router();

router.get("/", async (req, res) => {
  const email = req.query.email;

  try {
    const user = await User.findOne({ email });

    res.status(201).json(user.categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  const { type, title } = req.body;
  const email = req.query.email;

  try {
    const user = await User.findOne({ email });
    user.categories.map((category) => {
      if (category.title.toLowerCase() === title.toLowerCase()) {
        throw new Error("Category already exists");
      }
    });
    user.categories.push({
      type,
      title,
    });
    await user.save();

    res.status(201).json(user.categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const { title } = req.body;
  id = req.params.id;
  const email = req.query.email;

  try {
    const user = await User.findOne({ email });
    const category = user.categories.find((category) =>
      category._id.equals(id)
    );
    user.categories.map((category) => {
      if (category.title.toLowerCase() === title.toLowerCase()) {
        throw new Error("Category already exists");
      }
    });
    console.log(user);
    console.log(category);
    category.title = title;
    await user.save();

    res.status(201).json(user.categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const email = req.query.email;
  const id = req.params.id;

  try {
    const user = await User.findOne({ email });
    const category = user.categories.findIndex((category) =>
      category._id.equals(id)
    );
    user.categories.splice(category, 1);
    await user.save();
    res.status(201).json(user.categories);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
