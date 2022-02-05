const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  accessToken: String,
  created: { type: Number, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
