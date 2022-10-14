const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnection = require("./config/db.config");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./swagger.json");
// variables
const app = express();
const { PORT } = process.env;
const port = PORT || 8080;

// middlewares
app.use(express.json());
app.use(cors());
app.use("/files", express.static("assets"));
// app.use(express.static(path.join(__dirname, "./public")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// swagger
// const swaggerOption = {
//   swaggerDefination: {
//     info: {
//       title: "Drive API",
//       version: "1.0.0",
//       description: "Drive Api here",
//     },
//   },
//   apis: ["index.js"],
// };

// const swaggerDocs = swaggerJsdoc(swaggerOption);
// console.log(swaggerDocs);
/*
*@swagger
* /books
* get:
* description: Get ALl

*/
// routes
app.get("/", (req, res) => {
  res.send("Hey");
});
app.use("/api/v1/user", require("./routes/user.route"));
app.use("/api/v1/folder", require("./routes/drive/drive.route"));
app.use("/api/v1/file", require("./routes/file.route"));

// server
app.listen(port, () => {
  console.log(`server is running on ${port}`);
  dbConnection();
});
