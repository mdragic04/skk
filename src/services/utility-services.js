const jwt = require("jsonwebtoken");

const { Const } = require("../lib");

const sendResponse = ({ response, code, message, data }) => {
  if (code !== Const.responseCodeSuccess) {
    console.log(`Error code ${code}, ${message}`);
    response.json({
      code,
      time: Date.now(),
    });
  } else {
    response.json({
      code,
      time: Date.now(),
      data: data || {},
    });
  }
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
      console.error("Token checker", error);
      return sendResponse({
        response,
        code: Const.responseCodeTokenInvalid,
        message: "Invalid token",
      });
    }

    request.decoded = decoded;
    next();
  });
};

module.exports = { sendResponse, generateToken, tokenChecker };
