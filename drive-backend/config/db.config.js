const mongoose = require("mongoose");

const { DB_URI } = process.env;

function dbConnection() {
  mongoose.connect(`${DB_URI}`, (err) => {
    if (err) return console.log(err);
    console.log("connected with db");
  });
}

module.exports = dbConnection;
