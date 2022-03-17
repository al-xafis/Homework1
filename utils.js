const bcrypt = require("bcrypt");

const users = [];

function registerUser(user) {
  let randId = Math.floor(Math.random() * 1000);
  let existingUser = users.find((user) => user.id === randId);
  if (existingUser) {
    return;
  } else {
    users.push({
      id: Math.floor(Math.random() * 1000),
      username: user.username,
      password: bcrypt.hashSync(user.password, 10),
      role: user.role,
    });
  }
}

function getUserByUsername(username) {
  return users.find((user) => user.username === username);
}

function loginUser(username, password) {
  const user = getUserByUsername(username);
  try {
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
  } catch (err) {
    console.log(err);
  }

  return null;
}

module.exports = { users, getUserByUsername, loginUser, registerUser };
