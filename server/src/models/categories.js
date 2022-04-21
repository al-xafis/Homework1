const mongoose = require("mongoose");

// const categoriesSchema = new mongoose.Schema({
//   owner: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   expenseCategory: {
//     type: Array,
//     default: [
//       "Food",
//       "Transportation",
//       "Housing",
//       "Education",
//       "Shopping",
//       "Kids",
//       "Entertainment",
//       "Health and beauty",
//       "Pet",
//       "Internet",
//       "Mobile",
//     ],
//   },
//   incomeCategory: {
//     type: Array,
//     default: [
//       "Salary",
//       "Debt repayment",
//       "Gift",
//       "Rental income",
//       "Premium/bonus",
//     ],
//   },
// });

// module.exports = mongoose.model("Category", categoriesSchema);

const categoriesSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Income", "Expense"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = categoriesSchema;

// module.exports = mongoose.model("Category", categoriesSchema);
