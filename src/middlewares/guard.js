const User = require("../models/users");

async function adminGuard(req, res, next) {
  let user = await User.findOne({ username: req.user.username });

  if (user && user.role.toLowerCase() === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
}

module.exports = { adminGuard };
