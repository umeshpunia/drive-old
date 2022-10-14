const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    default: "active",
  },
  password: {
    type: String,
    required: true,
  },
  registeredOn: {
    type: Date,
    default: Date.now(),
  },
  picture: {
    type: String,
    required: true,
  },
  verfied: {
    type: Boolean,
    default: false,
  },
  passToken: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "folder",
  },
});

module.exports = mongoose.model("user", UserSchema);
