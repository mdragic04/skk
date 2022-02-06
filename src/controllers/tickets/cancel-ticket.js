const { Const } = require("../../lib");

const {
  ticketServices: { getTicket, updateTicket },
  transactionServices: { getTransaction, updateTransaction },
  userServices: { getUser },
  utilityServices: { sendResponse, isValidObjectId },
} = require("../../services");

module.exports = async (request, response) => {
  try {
    const { ticketId } = request.params;
    const { name, email } = request.decoded;
    const requestUser = await getUser({ query: { name, email } });
    const data = { canceled: false };

    if (!isValidObjectId(ticketId)) {
      return sendResponse({
        response,
        code: Const.responseCodeInvalidTicketId,
        message: "cancel ticket - invalid ticket id",
        data,
      });
    }

    const ticket = await getTicket({ query: { _id: ticketId } });
    if (!ticket) {
      return sendResponse({
        response,
        code: Const.responseCodeTicketNotFound,
        message: "cancel ticket - ticket not found",
        data,
      });
    }

    if (Date.now() > ticket.departTime - Const.cancelWindow) {
      return sendResponse({
        response,
        code: Const.responseCodeCancelTimeWindowExceeded,
        message: "cancel ticket - cancel time window exceeded",
        data,
      });
    }

    const transaction = await getTransaction({
      query: {
        ticketId,
        userId: requestUser._id.toString(),
        status: Const.transactionStatusCompleted,
      },
    });
    if (!transaction) {
      return sendResponse({
        response,
        code: Const.responseCodeTransactionNotFound,
        message: "cancel ticket - transaction not found",
        data,
      });
    }

    ticket.quantity += 1;
    await updateTicket(ticket);

    transaction.status = Const.transactionStatusCanceled;
    await updateTransaction(transaction);

    data.canceled = true;
    data.transactionId = transaction._id.toString();

    sendResponse({
      response,
      code: Const.responseCodeSuccess,
      data,
    });
  } catch (error) {
    console.error("cancel ticket", error);
    sendResponse({ response, code: Const.responseCodeServerError });
  }
};
