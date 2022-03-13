const bcrypt = require("bcrypt");

const users = [];

function registerUser(user) {
  users.push({
    id: Math.random(),
    username: user.username,
    password: bcrypt.hashSync(user.password, 10),
    role: user.role,
  });
}

function getUserByUsername(username) {
  return users.find((user) => user.username === username);
}

function loginUser(username, password) {
  const user = getUserByUsername(username);
  console.log(user);
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
