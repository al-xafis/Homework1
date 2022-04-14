const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Income", "Expense"],
    required: true,
  },
  title: {
    type: String,
  },
  category: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  payee: {
    type: String,
  },
  date: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

module.exports = transactionSchema;
