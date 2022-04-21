const mongoose = require("mongoose");
const Transaction = require("./transactions");
const Subscription = require("./subscriptions");

const accountSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
    },
    transactions: {
      type: [Transaction],
      default: [],
    },
    subscriptions: {
      type: [Subscription],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = accountSchema;
