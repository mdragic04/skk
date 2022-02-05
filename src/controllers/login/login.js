const { Const } = require("../../lib");

const { userServices, utilityServices } = require("../../services");
const { sendResponse } = utilityServices;

module.exports = async (request, response) => {
  try {
    const { name, email } = request.body;

    const { code, message } = userServices.validateUserData({ name, email }) || {};
    if (code) {
      return sendResponse({ response, code, message: `login - ${message}` });
    }

    const user = await userServices.getUser({ query: { name, email } });
    if (!user) {
      return sendResponse({
        response,
        code: Const.responseCodeUserNotFound,
        message: "login - user not found",
      });
    }

    const accessToken = utilityServices.generateToken({ name, email });
    user.accessToken = accessToken;

    await userServices.updateUser(user);

    sendResponse({ response, code: Const.responseCodeSuccess, data: { name, email, accessToken } });
  } catch (error) {
    console.error("login", error);
    sendResponse({ response, code: Const.responseCodeServerError });
  }
};
