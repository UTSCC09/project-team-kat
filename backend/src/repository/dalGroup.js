const Group = require('../models/Group');
const mongoose = require('mongoose');
const referralCodes = require('referral-codes');
const {ApolloError} = require('apollo-server-errors');

module.exports = {
  createGroup: async (name, ownerId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const codes = referralCodes.generate({
        length: 8,
        count: 1,
      });
      const newGroup = new Group({name, ownerId,
        members: [ownerId], code: codes[0]});
      const savedGrp = await newGroup.save();
      return savedGrp;
    } catch (err) {
      throw new ApolloError('Internal Error.');
    } finally {
      await session.endSession();
    }
  },
  getGroup: async (groupId) => {
    try {
      return await Group.find({id: groupId});
    } catch (err) {
      throw new ApolloError('Internal Error.');
    }
  },
  getGroups: async (userId) => {
    try {
      return await Group.find({members: userId});
    } catch (err) {
      throw new ApolloError('Internal Error.');
    }
  },
  getGroupByCode: async (code) => {
    try {
      return await Group.findOne({code});
    } catch (err) {
      throw new ApolloError('Internal Error.');
    }
  },
  addMemberByCode: async (code, memberId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const updatedGrp = await Group.findOneAndUpdate({code},
          {$push: {members: memberId}}, {returnOriginal: false});
      return updatedGrp;
    } catch (err) {
      throw new ApolloError('Internal Error.');
    } finally {
      await session.endSession();
    }
  },
};
