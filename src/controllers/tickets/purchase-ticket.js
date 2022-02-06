const { Const } = require("../../lib");

const {
  ticketServices: { getTicket, updateTicket },
  transactionServices: { createTransaction },
  userServices: { getUser },
  utilityServices: { sendResponse, isValidObjectId },
} = require("../../services");

module.exports = async (request, response) => {
  try {
    const { ticketId } = request.params;
    const { cardNumber } = request.body;
    const { name, email } = request.decoded;
    const requestUser = await getUser({ query: { name, email } });
    const data = { completed: false };

    if (!isValidObjectId(ticketId)) {
      return sendResponse({
        response,
        code: Const.responseCodeInvalidTicketId,
        message: "purchase ticket - invalid ticket id",
        data,
      });
    }

    const ticket = await getTicket({ query: { _id: ticketId } });
    if (!ticket) {
      return sendResponse({
        response,
        code: Const.responseCodeTicketNotFound,
        message: "purchase ticket - ticket not found",
        data,
      });
    }

    if (ticket.quantity === 0) {
      return sendResponse({
        response,
        code: Const.responseCodeTicketQuantity,
        message: "purchase ticket - not enough ticket quantity",
        data,
      });
    }
    if (Date.now() > ticket.departTime) {
      return sendResponse({
        response,
        code: Const.responseCodeTicketDepartTimeExceeded,
        message: "purchase ticket - ticket depart time exceeded",
        data,
      });
    }

    if (!cardNumber) {
      return sendResponse({
        response,
        code: Const.responseCodeNoCardNumber,
        message: "purchase ticket - no card number",
        data,
      });
    }
    const numberRegex = /^\d+$/;
    if (!numberRegex.test(cardNumber)) {
      return sendResponse({
        response,
        code: Const.responseCodeInvalidCardNumber,
        message: "purchase ticket - invalid card number",
        data,
      });
    }

    ticket.quantity -= 1;
    await updateTicket(ticket);

    const transaction = await createTransaction({
      transactionType: Const.transactionTypeTicket,
      ticketId,
      userId: requestUser._id.toString(),
      quantity: 1,
      status: Const.transactionStatusCompleted,
    });

    sendResponse({
      response,
      code: Const.responseCodeSuccess,
      data: {
        completed: true,
        transactionId: transaction._id.toString(),
      },
    });
  } catch (error) {
    console.error("purchase ticket ", error);
    sendResponse({ response, code: Const.responseCodeServerError });
  }
};
