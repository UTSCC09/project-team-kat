const checkAuth = require('../../utils/checkAuth');
const costRepository = require('../../repository/dalCost');
const userRepository = require('../../repository/dalUser');
const groupRepository = require('../../repository/dalGroup');
const mongoose = require('mongoose');

const {UserInputError, ForbiddenError} = require('apollo-server-errors');

const getCostInfo = async (cost) => {
  return {
    id: cost.id,
    name: cost.name,
    ownerId: cost.ownerId,
    amount: cost.amount,
    groupId: cost.groupId,
    applicableUsers: await Promise.all(cost.applicableUsers.map((member) => {
      const memberUser = userRepository.getUserById(member);
      return memberUser;
    })),
  };
};

module.exports = {
  Query: {
    getCostsByGroup: async (_, {id}, context) => {
      const user = checkAuth(context);

      const foundGroup = await groupRepository.getGroup(id);
      if (!foundGroup) {
        throw new UserInputError(`Group with id: ${id} not found`);
      } else if (!foundGroup.members.includes(user.id)) {
        throw new ForbiddenError('Access denied');
      }

      const rawCosts = await costRepository.getCostsByGroup(id);
      const costs = await Promise.all(rawCosts.map((a) => getCostInfo(a)));
      return costs;
    },
  },
  Mutation: {
    createCost: async (_, {name, applicableUsers,
      amount, groupId}, context) => {
      const user = checkAuth(context);
      if (!(name && applicableUsers && amount && groupId)) {
        throw new UserInputError('Missing fields!');
      }
      if (!mongoose.isValidObjectId(groupId)) {
        throw new UserInputError(`Invalid group id: ${groupId}`);
      }
      const foundGroup = await groupRepository.getGroup(groupId);
      if (!(foundGroup)) {
        throw new UserInputError(`Group with id: ${groupId} not found`);
      }
      if (!foundGroup.members.includes(user.id)) {
        throw new ForbiddenError('Access denied');
      }
      applicableUsers.forEach((userId) => {
        if (!mongoose.isValidObjectId(userId)) {
          throw new UserInputError(`Invalid user id: ${userId}`);
        }
        if (!foundGroup.members.includes(userId)) {
          throw new UserInputError(`User with id ${userId} cannot`+
          `be found in group with id ${groupId}`);
        }
      });
      const newCost = await costRepository.createCost(
          name, amount, user.id, applicableUsers, groupId,
      );
      return await getCostInfo(newCost);
    },
  },
};
