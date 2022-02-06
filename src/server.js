require("dotenv").config();
require("./db");

const express = require("express");
const router = require("./routes");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/", (request, response, next) => {
  // debug output
  console.log("method :", request.method, "url :", request.originalUrl);
  next();
});

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
