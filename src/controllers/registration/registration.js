const { Const } = require("../../lib");

const { registrationServices, userServices, utilityServices } = require("../../services");
const { sendResponse } = utilityServices;

module.exports = async (request, response) => {
  try {
    const { name, email } = request.body;

    const { code, message } = registrationServices.validateRegistrationData({ name, email }) || {};
    if (code) {
      return sendResponse({ response, code, message: `registration - ${message}` });
    }

    const userExists = await userServices.getUser({ query: { name, email } });
    if (userExists) {
      return sendResponse({
        response,
        code: Const.responseCodeUserAlreadyExists,
        message: "registration - user already exists",
      });
    }

    const accessToken = utilityServices.generateToken({ name, email });

    await userServices.createUser({ name, email, accessToken });

    sendResponse({ response, code: Const.responseCodeSuccess, data: { name, email, accessToken } });
  } catch (error) {
    console.error("registration", error);
    sendResponse({ response, code: Const.responseCodeServerError });
  }
};
