const mongoose = require("mongoose");
const currentTime = Date.now();

const expireTime = currentTime + 1000 * 300;

const TokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    default: "active",
  },
  generatedOn: {
    type: String,
    default: currentTime.toString(),
  },
  expiresOn: {
    type: String,
    default: expireTime,
  },
});

module.exports = mongoose.model("pass-token", TokenSchema);
