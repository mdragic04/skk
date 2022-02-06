module.exports = {
  responseCodeSuccess: 1,
  responseCodeServerError: 500,

  responseCodeTokenInvalid: 111111,

  responseCodeNoName: 400000,
  responseCodeNoEmail: 400001,
  responseCodeInvalidEmail: 400002,

  responseCodeUserAlreadyExists: 400003,
  responseCodeUserNotFound: 400004,

  responseCodeInvalidTicketId: 400005,
  responseCodeTicketNotFound: 400006,
  responseCodeTicketQuantity: 400007,
  responseCodeTicketDepartTimeExceeded: 400008,
  responseCodeNoCardNumber: 400009,
  responseCodeInvalidCardNumber: 400010,

  responseCodeCancelTimeWindowExceeded: 400015,
  responseCodeTransactionNotFound: 400016,

  transactionTypeTicket: 1,

  transactionStatusCompleted: 1,
  transactionStatusCanceled: 2,

  cancelWindow: 60 * 60 * 1000,
};
