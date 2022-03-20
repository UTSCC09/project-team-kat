const Cost = require('../models/Cost');
const mongoose = require('mongoose');
const {ApolloError} = require('apollo-server-errors');

module.exports = {
  getAllCostsByGroup: async (id) => {
    const costs = await Cost.find({groupId: id});
    return costs;
  },
  getPaginatedCostsByGroup: async (id, limit, skip) => {
    const costs = await Cost.find({groupId: id})
        .sort({'createdAt': -1}).skip(skip*limit).limit(limit);
    return costs;
  },
  getTotalCostsByGroup: async (id) => {
    try {
      return await Cost.find({groupId: id}).count();
    } catch (err) {
      throw new ApolloError('Internal Error.');
    }
  },
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
