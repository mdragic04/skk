const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transactionType: Number,
  ticketId: String,
  userId: String,
  quantity: Number,
  status: Number,
  created: { type: Number, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
