const Cost = require('../models/Cost');
const mongoose = require('mongoose');
const {ApolloError} = require('apollo-server-errors');

module.exports = {
  createCost: async (name, amount, ownerId, applicableUsers, groupId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const newCost = new Cost({name, amount,
        applicableUsers, ownerId, groupId});
      const savedCost = await newCost.save();
      return savedCost;
    } catch (err) {
      throw new ApolloError('Internal Error.');
    } finally {
      await session.endSession();
    }
  },
};
