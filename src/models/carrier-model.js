const mongoose = require("mongoose");

const carrierSchema = new mongoose.Schema({
  name: String,
  created: { type: Number, default: Date.now },
});

module.exports = mongoose.model("Carrier", carrierSchema);
