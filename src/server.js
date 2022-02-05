require("dotenv").config();

const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, access-token"
  );

  // debug output
  console.log("method :", req.method, "url :", req.originalUrl);
  next();
});

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
