const checkAuth = require('../../utils/checkAuth');
const costRepository = require('../../repository/dalCost');
const userRepository = require('../../repository/dalUser');

const {ApolloError} = require('apollo-server-errors');

const getCostInfo = async (cost) => {
  return {
    id: cost.id,
    name: cost.name,
    userId: cost.userID,
    amount: cost.amount,
    applicableUsers: await Promise.all(cost.applicableUsers.map((member) => {
      const memberUser = userRepository.getUserById(member);
      return memberUser;
    })),
  };
};

module.exports = {
  Mutation: {
    createCost: async (_, {name, applicableUsers,
      amount, groupID}, context) => {
      if (!name || !applicableUsers || !amount || !groupID) {
        throw new ApolloError(`Missing fields!`,
            'BAD_USER_INPUT', {type: 'INVALID_NAME'});
      }
      const user = checkAuth(context);
      const newCost = await costRepository.createCost(
          name, amount, user.id, applicableUsers, groupID,
      );
      return getCostInfo(newCost);
    },
  },
};
