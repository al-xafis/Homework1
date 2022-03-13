const { getUserByUsername } = require("../database");

function adminGuard(req, res, next) {
  let user = getUserByUsername(req.user.username);
  if (user && user.role.toLowerCase() === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
}

module.exports = { adminGuard };
