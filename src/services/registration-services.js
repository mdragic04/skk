const { Const } = require("../lib");

const validateRegistrationData = ({ name, email }) => {
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

  if (!emailRegexp.test(emailToValidate)) {
    return {
      code: Const.responseCodeNoEmail,
      message: "invalid email parameter",
    };
  }

  const user = await;
};

module.exports = { validateRegistrationData };
