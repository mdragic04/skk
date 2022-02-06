const { Const } = require("../../lib");

const {
  ticketServices: { getTickets },
  utilityServices: { sendResponse },
} = require("../../services");

module.exports = async (request, response) => {
  try {
    const tickets = await getTickets({});
    sendResponse({ response, code: Const.responseCodeSuccess, data: { tickets } });
  } catch (error) {
    console.error("getTickets", error);
    sendResponse({ response, code: Const.responseCodeServerError });
  }
};
