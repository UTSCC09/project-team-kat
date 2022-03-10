const checkAuth = require('../../utils/checkAuth');
const groupRepository = require('../../repository/dalGroup');
const userRepository = require('../../repository/dalUser');

const {ApolloError} = require('apollo-server-errors');

const getGroupInfo = async (group) => {
  return {
    id: group.id,
    name: group.name,
    ownerId: group.ownerId,
    code: group.code,
    members: await Promise.all(group.members.map((member) => {
      const memberUser = userRepository.getUserById(member);
      return memberUser;
    })),
  };
};

module.exports = {
  Query: {
    getGroups: async (_, params, context) => {
      const user = checkAuth(context);
      const groups = await groupRepository.getGroups(user.id);
      return await Promise.all(groups.map((group) => (getGroupInfo(group))));
    },
  },
  Mutation: {
    createGroup: async (_, {name}, context) => {
      const user = checkAuth(context);
      const newGroup = await groupRepository.createGroup(name, user.id);
      return getGroupInfo(newGroup);
    },
    joinGroup: async (_, {code}, context) => {
      const user = checkAuth(context);
      const foundGroup = await groupRepository.getGroupByCode(code);
      if (!foundGroup) {
        throw new ApolloError(`Group with code ${code} not found.',
      'NOT_FOUND', {type: 'INVALID_CODE'}`);
      };
      if (foundGroup.members.includes(user.id)) {
        throw new ApolloError(`Already joined group.',
      'BAD_USER_INPUT', {type: 'INVALID_CODE'}`);
      }
      const updatedGroup = await groupRepository.addMemberByCode(code, user.id);
      return await getGroupInfo(updatedGroup);
    },
  },
};
