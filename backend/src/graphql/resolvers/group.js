const checkAuth = require('../../utils/checkAuth');
const groupRepository = require('../../repository/dalGroup');
const userRepository = require('../../repository/dalUser');

const {UserInputError} = require('apollo-server-errors');

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
      let limit = params.limit;
      let skip = params.skip;
      if (!(limit && skip)) {
        limit = 6;
        skip = 0;
      }
      const paginatedGroups = await groupRepository
          .getPaginatedGroups(user.id, limit, skip);
      const totalItems = await groupRepository.getTotalGroups(user.id);
      return {
        totalItems,
        data: await Promise.all(
            paginatedGroups.map((group) => (getGroupInfo(group)))),
      };
    },
  },
  Mutation: {
    createGroup: async (_, {name}, context) => {
      if (!name) {
        throw new UserInputError('A group name is required.');
      }
      const user = checkAuth(context);
      const newGroup = await groupRepository.createGroup(name, user.id);
      return getGroupInfo(newGroup);
    },
    joinGroup: async (_, {code}, context) => {
      if (!code) {
        throw new UserInputError('A group code is required.');
      }
      const user = checkAuth(context);
      const foundGroup = await groupRepository.getGroupByCode(code);
      if (!foundGroup) {
        throw new UserInputError(`Group with code ${code} not found.`);
      };
      if (foundGroup.members.includes(user.id)) {
        throw new UserInputError('Already joined group.');
      }
      const updatedGroup = await groupRepository.addMemberByCode(code, user.id);
      return await getGroupInfo(updatedGroup);
    },
  },
};
