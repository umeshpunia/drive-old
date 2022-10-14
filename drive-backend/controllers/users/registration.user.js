const UserSchema = require("../../models/user.model");
const bcrypt = require("bcryptjs");

// function registeration(req, res) {

// }

function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please Fill All Fields" });
  }

  // match user
  UserSchema.findOne({ email }, (err, data) => {
    if (err) return res.status(500).json({ msg: err.message });
    if (!data) return res.status(400).json({ msg: "Please Try Again" });
    let dbPass = data.password;

    bcrypt.compare(password, dbPass, (err, valid) => {
      if (err) return res.status(500).json({ msg: err.message });
      if (!valid) return res.status(400).json({ msg: "Please Try Again" });
      return res.status(200).json({ msg: "Login Successfully" });
    });
  });
}

module.exports = { login };
