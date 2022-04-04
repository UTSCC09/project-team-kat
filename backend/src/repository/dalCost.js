const Cost = require('../models/Cost');
const mongoose = require('mongoose');
const {ApolloError} = require('apollo-server-errors');

module.exports = {
  getAllActiveCostsByGroup: async (id) => {
    try {
      const costs = await Cost.find({groupId: id, active: true});
      return costs;
    } catch (err) {
      throw new ApolloError('Internal Error.');
    }
  },
  getPaginatedActiveCostsByGroup: async (id, limit, skip) => {
    try {
      const costs = await Cost.find({groupId: id, active: true})
          .sort({'createdAt': -1}).skip(skip*limit).limit(limit);
      return costs;
    } catch (err) {
      throw new ApolloError('Internal Error.');
    }
  },
  getTotalActiveCostsByGroup: async (id) => {
    try {
      return await Cost.find({groupId: id, active: true}).count();
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
  getCostById: async (id) => {
    try {
      return await Cost.findById(id);
    } catch (err) {
      throw new ApolloError('Internal Error.');
    }
  },
  completeCostTransaction: async (id) => {
    try {
      return await Cost.findByIdAndUpdate(id, {active: false});
    } catch (err) {
      throw new ApolloError('Internal Error.');
    }
  },
};
