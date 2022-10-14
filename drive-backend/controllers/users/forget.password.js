const { main } = require("../../services/mail.service");
const UserSchema = require("../../models/user.model");
const TokenSchema = require("../../models/password.model");
const bcrypt = require("bcryptjs");

function forget(req, res) {
  const { email } = req.body;
  UserSchema.findOne({ email }, (err, data) => {
    if (err) return res.status(500).json({ msg: err.message });
    if (!data) return res.status(400).json({ msg: "Please Try Again" });

    const token = Math.floor(100000 + Math.random() * 900000);
    // send mail
    main(email, "Forget Password", `Your Pin Is ${token}`)
      .then((v) => {
        let insToken = new TokenSchema({ email, token });
        insToken.save((err, data) => {
          if (err) return res.status(500).json({ msg: err.message });
          if (!data) return res.status(400).json({ msg: "Please Try Again" });
          return res
            .status(200)
            .json({ msg: "Mail Sent Please Check Your Email" });
        });
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  });
}
function matchToken(req, res) {
  const { email, token } = req.body;
  if (!email || !token)
    return res.status(400).json({ msg: "Please Fill Value" });
  TokenSchema.findOne({ email, token }, (err, data) => {
    if (err) return res.status(500).json({ msg: err.message });
    if (!data) return res.status(400).json({ msg: "Please Try Again" });

    const currentTime = Date.now();

    let { expiresOn, _id } = data;

    if (currentTime >= expiresOn) {
      TokenSchema.findByIdAndUpdate({ _id }, { token: "" }, (err, data) => {
        if (err) return res.status(500).json({ msg: err.message });
        if (!data) return res.status(400).json({ msg: "Please Try Again" });
        return res.status(401).json({ msg: "Token Expired" });
      });
    } else {
      return res.status(200).json({ msg: "Token Matched" });
    }
  });
}

function reset(req, res) {
  const { np, cp, email } = req.body;
  if (!email || !np || !cp)
    return res.status(400).json({ msg: "Please Fill Value" });

  if (cp != np) return res.status(400).json({ msg: "Please Match Password" });

  UserSchema.findOne({ email }, (err, user) => {
    if (err) return res.status(500).json({ msg: err.message });
    if (!user) return res.status(400).json({ msg: "Please Try Again" });
    const { _id } = user;
    bcrypt.hash(cp, 12, (err, password) => {
      if (err) return res.status(500).json({ msg: err.message });
      if (!password) return res.status(400).json({ msg: "Please Try Again" });

      UserSchema.findByIdAndUpdate({ _id }, { password }, (err, data) => {
        if (err) return res.status(500).json({ msg: err.message });
        if (!data) return res.status(400).json({ msg: "Please Try Again" });
        TokenSchema.updateOne(
          { email },
          { $set: { token: "" } },
          (err, result) => {
            if (err) return res.status(500).json({ msg: err.message });
            if (!result)
              return res.status(400).json({ msg: "Please Try Again" });
            main(
              email,
              "Password Reset",
              "Your Password Reset Successfully"
            ).save((response) => {
              return res.status(200).json({ msg: "Password Reset" });
            });
          }
        );
      });
    });
  });
}

module.exports = { forget, reset, matchToken };
