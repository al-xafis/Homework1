const mongoose = require("mongoose");
const Account = require("./accounts");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      validate: {
        validator: (v) => v === "ADMIN" || v === "USER",
      },
    },
    accounts: [Account],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
