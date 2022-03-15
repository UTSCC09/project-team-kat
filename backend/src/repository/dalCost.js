const Cost = require('../models/Cost');
const mongoose = require('mongoose');
const {ApolloError} = require('apollo-server-errors');

module.exports = {
  createCost: async (name, amount, userID, applicableUsers, groupID) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const newCost = new Cost({name, amount,
        applicableUsers, userID, groupID});
      const savedCost = await newCost.save();
      return savedCost;
    } catch (err) {
      throw new ApolloError('Internal Error.');
    } finally {
      await session.endSession();
    }
  },
};
