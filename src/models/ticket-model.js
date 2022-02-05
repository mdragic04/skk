const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  carrierId: String,
  departTime: Number,
  arrivalTime: Number,
  quantity: Number,
  created: { type: Number, default: Date.now },
});

module.exports = mongoose.model("Ticket", ticketSchema);
