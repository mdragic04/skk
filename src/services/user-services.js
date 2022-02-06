const { User } = require("../models");

const validateUserData = ({ name, email }) => {
  if (!name || name === "") {
    return {
      code: Const.responseCodeNoName,
      message: "no name parameter",
    };
  }

  if (!email || email === "") {
    return {
      code: Const.responseCodeNoEmail,
      message: "no email parameter",
    };
  }

  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegexp.test(email)) {
    return {
      code: Const.responseCodeNoEmail,
      message: "invalid email parameter",
    };
  }
};

const createUser = (userData) => {
  return User.create(userData);
};

const getUser = ({ query, projection }) => {
  return User.findOne(query, projection);
};

const updateUser = (user) => {
  return user.save();
};

module.exports = { validateUserData, createUser, getUser, updateUser };
