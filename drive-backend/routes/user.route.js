const express = require("express");
const { login } = require("../controllers/users/registration.user");
const {
  forget,
  matchToken,
  reset,
} = require("../controllers/users/forget.password");
const randomstring = require("randomstring");
const bcrypt = require("bcryptjs");
const UserSchema = require("../models/user.model");

const multer = require("multer");
const router = express.Router();
// file uploading
const imgPath = "./assets/images/users";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imgPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = randomstring.generate({
      length: 12,
      charset: "alphabetic",
    });
    cb(null, `${uniqueName}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single("picture");

// file uploading ends

router.get("/", (req, res) => {
  res.send("Hey");
});

router.post("/register", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ msg: err instanceof multer.MulterError });
    } else if (err) {
      return res.status(500).json({ msg: err.message });
      // An unknown error occurred when uploading.
    }
    const { email, password, mobile, username, name } = req.body;
    const picture = req.file.filename;

    if (!name || !email || !password || !mobile || !username) {
      return res.status(400).json({ msg: "Please Fill All Fields" });
    }

    // hash password
    bcrypt.hash(password, 12, (err, hashPass) => {
      if (err) return res.status(500).json({ msg: err.message });
      if (!hashPass) return res.status(400).json({ msg: "Please Try Again" });

      let insUser = new UserSchema({
        email,
        password: hashPass,
        mobile,
        username,
        name,
        picture,
      });

      insUser.save((err, data) => {
        if (err) return res.status(500).json({ msg: err.message });
        if (!data) return res.status(400).json({ msg: "Please Try Again" });
        return res.status(200).json({ msg: "Registration Successfully" });
      });
    });
  });
});
router.post("/login", login);
router.post("/forget-password", forget);
router.post("/match-token", matchToken);
router.post("/reset", reset);

module.exports = router;
