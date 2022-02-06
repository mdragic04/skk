const { Ticket } = require("../models");

const getTicket = ({ query, projection }) => {
  return Ticket.findOne(query, projection);
};

const getTickets = ({ query, projection }) => {
  return Ticket.find(query, projection).lean();
};

const updateTicket = (ticket) => {
  return ticket.save();
};

module.exports = { getTicket, getTickets, updateTicket };
