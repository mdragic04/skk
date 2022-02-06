const { Const } = require("../../lib");

const {
  userServices: { validateUserData, getUser, updateUser },
  utilityServices: { sendResponse, generateToken },
} = require("../../services");

module.exports = async (request, response) => {
  try {
    const { name, email } = request.body;

    const { code, message } = validateUserData({ name, email }) || {};
    if (code) {
      return sendResponse({ response, code, message: `login - ${message}` });
    }

    const user = await getUser({ query: { name, email } });
    if (!user) {
      return sendResponse({
        response,
        code: Const.responseCodeUserNotFound,
        message: "login - user not found",
      });
    }

    const accessToken = generateToken({ name, email });
    user.accessToken = accessToken;

    await updateUser(user);

    sendResponse({ response, code: Const.responseCodeSuccess, data: { name, email, accessToken } });
  } catch (error) {
    console.error("login ", error);
    sendResponse({ response, code: Const.responseCodeServerError });
  }
};
