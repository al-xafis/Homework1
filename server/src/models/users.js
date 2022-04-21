const mongoose = require("mongoose");
const Account = require("./accounts");
const Category = require("./categories");

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
    categories: [Category],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

// {
//   type: String,
//   default: [
//     "Food",
//     "Transportation",
//     "Housing",
//     "Education",
//     "Shopping",
//     "Kids",
//     "Entertainment",
//     "Health and beauty",
//     "Pet",
//     "Internet",
//     "Mobile",
//   ],
// },
// {
//   type: String,
//   default: [
//     "Salary",
//     "Debt repayment",
//     "Gift",
//     "Rental income",
//     "Premium/bonus",
//   ],
// },
