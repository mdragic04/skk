const { Ticket } = require("../models");

const getTicket = ({ query, projection }) => {
  return Ticket.findOne(query, projection);
};

const getTickets = ({ query, projection, sort, skip, limit }) => {
  return Ticket.find(query, projection).sort(sort).skip(skip).limit(limit);
};

const updateTicket = (ticket) => {
  return ticket.save();
};

module.exports = { getTicket, getTickets, updateTicket };
