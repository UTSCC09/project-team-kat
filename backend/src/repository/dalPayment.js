const Payment = require('../models/Payment');
const mongoose = require('mongoose');
const {ApolloError} = require('apollo-server-errors');

module.exports = {
  createPayment: async (client_secret) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const newPayment = new Payment({client_secret});
      const savedPayment = await newPayment.save();
      return savedPayment;
    } catch (err) {
      throw new ApolloError('Internal Error.');
    } finally {
      await session.endSession();
    }
  },
};
