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

module.exports = { sendResponse, generateToken };
