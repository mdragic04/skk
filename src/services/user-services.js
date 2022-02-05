const { User } = require("../models");

const createUser = (userData) => {
  return User.create(userData);
};

const getUser = ({ query, projection }) => {
  return User.findOne({ query, projection });
};

module.exports = { createUser, getUser };
