const checkAuth = require('../../utils/checkAuth');
const costRepository = require('../../repository/dalCost');
const userRepository = require('../../repository/dalUser');

const {UserInputError} = require('apollo-server-errors');

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
  Mutation: {
    createCost: async (_, {name, applicableUsers,
      amount, groupId}, context) => {
      const user = checkAuth(context);
      if (!(name && applicableUsers && amount && groupId)) {
        throw new UserInputError('Missing fields!');
      }
      const newCost = await costRepository.createCost(
          name, amount, user.id, applicableUsers, groupId,
      );
      return await getCostInfo(newCost);
    },
  },
};
