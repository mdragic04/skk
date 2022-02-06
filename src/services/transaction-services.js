const { Transaction } = require("../models");

const createTransaction = (transactionData) => {
  return Transaction.create(transactionData);
};

const getTransaction = ({ query, projection }) => {
  return Transaction.findOne(query, projection);
};

const getTransactions = ({ query, projection }) => {
  return Transaction.find(query, projection).lean();
};

const updateTransaction = (transaction) => {
  return transaction.save();
};

module.exports = { createTransaction, getTransaction, getTransactions, updateTransaction };
