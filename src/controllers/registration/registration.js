const { Const } = require("../../lib");

const {
  userServices: { validateUserData, getUser, createUser },
  utilityServices: { sendResponse, generateToken },
} = require("../../services");

module.exports = async (request, response) => {
  try {
    const { name, email } = request.body;

    const { code, message } = validateUserData({ name, email }) || {};
    if (code) {
      return sendResponse({ response, code, message: `registration - ${message}` });
    }

    const userExists = await getUser({ query: { name, email } });
    if (userExists) {
      return sendResponse({
        response,
        code: Const.responseCodeUserAlreadyExists,
        message: "registration - user already exists",
      });
    }

    const accessToken = generateToken({ name, email });

    const user = await createUser({ name, email, accessToken });

    sendResponse({ response, code: Const.responseCodeSuccess, data: { user } });
  } catch (error) {
    console.error("registration", error);
    sendResponse({ response, code: Const.responseCodeServerError });
  }
};
