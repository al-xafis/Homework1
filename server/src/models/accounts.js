const mongoose = require("mongoose");
const Transaction = require("./transactions");

const accountSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    transactions: {
      type: [Transaction],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = accountSchema;
