const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { Const } = require("../lib");

const sendResponse = ({ response, code, message, data }) => {
  if (code !== Const.responseCodeSuccess) {
    console.log(`Error code ${code}, ${message}`);
  }
  response.json({
    code,
    time: Date.now(),
    data,
  });
};

const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL });
};

const tokenChecker = (request, response, next) => {
  const token = request.body.token || request.query.token || request.headers["x-access-token"];
  if (!token) {
    return sendResponse({
      response,
      code: Const.responseCodeTokenInvalid,
      message: "Invalid token",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      let message = "Invalid token";
      if (error.name === "TokenExpiredError") {
        message = "Token expired";
      } else {
        console.error("Token checker", error);
      }
      return sendResponse({
        response,
        code: Const.responseCodeTokenInvalid,
        message,
      });
    }

    request.decoded = decoded;
    next();
  });
};

const isValidObjectId = (id) => {
  return mongoose.isValidObjectId(id);
};

module.exports = { sendResponse, generateToken, tokenChecker, isValidObjectId };
