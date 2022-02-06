const { Const } = require("../../lib");

const { ticketServices, utilityServices } = require("../../services");
const { sendResponse } = utilityServices;

module.exports = async (request, response) => {
  try {
    const tickets = await ticketServices.getTickets({});
    sendResponse({ response, code: Const.responseCodeSuccess, data: { tickets } });
  } catch (error) {
    console.error("getTickets", error);
    sendResponse({ response, code: Const.responseCodeServerError });
  }
};
