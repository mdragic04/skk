const { Const } = require("../../lib");

const {
  ticketServices: { getTickets },
  transactionServices: { getTransactions },
  userServices: { getUser },
  utilityServices: { sendResponse },
} = require("../../services");

module.exports = async (request, response) => {
  try {
    const { name, email } = request.decoded;
    const requestUser = await getUser({ query: { name, email } });

    const transactions = await getTransactions({
      query: { userId: requestUser._id.toString(), status: Const.transactionStatusCompleted },
    });
    if (transactions.length === 0) {
      return sendResponse({
        response,
        code: Const.responseCodeSuccess,
        data: { purchasedTickets: [] },
      });
    }

    const ticketIds = [...new Set(transactions.map((transaction) => transaction.ticketId))];

    const tickets = await getTickets({ query: { _id: { $in: ticketIds } } });

    const ticketsObj = tickets.reduce((acc, ticket) => {
      const ticketId = ticket._id.toString();
      if (!acc[ticketId]) {
        acc[ticketId] = ticket;
      }
      return acc;
    }, {});

    const purchasedTickets = transactions.map((transaction) => {
      return { ...transaction, ticket: ticketsObj[transaction.ticketId] };
    });

    sendResponse({ response, code: Const.responseCodeSuccess, data: { purchasedTickets } });
  } catch (error) {
    console.error("get purchased tickets ", error);
    sendResponse({ response, code: Const.responseCodeServerError });
  }
};
