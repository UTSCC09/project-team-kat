const postRepository = require('../../repository/dalPost');
const groupRepository = require('../../repository/dalGroup');

const dotenv = require('dotenv');

const {UserInputError, AuthenticationError} = require('apollo-server-express');
const checkAuth = require('../../utils/checkAuth');

dotenv.config();

module.exports = {
  Query: {
    getPostsByGroup: async (_, {id}, context) => {
      const user = checkAuth(context);

      const group = await groupRepository.getGroup(id);
      if (!group || !group.members.includes(user.id)) {
        throw new AuthenticationError('Cannot access unauthorized groups!');
      }

      const posts = await postRepository.getPostsByGroup(id);
      return posts;
    },
  },

  Mutation: {
    createPost: async (_, post, context) => {
      const user = checkAuth(context);

      const {title, message, group, left, top} = post;
      if (!title || !message || !group || !left || !top) {
        throw new UserInputError('Missing required field from request!');
      }

      const foundGroup = await groupRepository.getGroup(group);
      if (!foundGroup) {
        throw new UserInputError('Invalid group id!');
      }

      if (!foundGroup.members.includes(user.id)) {
        throw new AuthenticationError('Cannot access unauthorized groups!');
      }

      const newPost = await postRepository
          .createPost(user.id, title, message, user.username, group, left, top);

      return newPost;
    },
    updatePost: async (_, post, context) => {
      const user = checkAuth(context);

      const {id, group, title, message, left, top} = post;
      if (!id || !group || !title || !message || !left || !top) {
        throw new UserInputError('Missing required field from request!');
      }

      const foundGroup = await groupRepository.getGroup(group);
      if (!foundGroup.members.includes(user.id)) {
        throw new AuthenticationError('Cannot access unauthorized groups!');
      }

      const updated = {title, message, left, top};
      await postRepository.updatePost(id, updated);
      return 'Successfully Updated!';
    },
    deletePost: async (_, post, context) => {
      const user = checkAuth(context);

      const {id, group} = post;
      if (!id || !group) {
        throw new UserInputError('Missing required field from request!');
      }

      const foundGroup = await groupRepository.getGroup(group);
      if (!foundGroup.members.includes(user.id)) {
        throw new AuthenticationError('Cannot access unauthorized groups!');
      }

      await postRepository.delete(id);
      return 'Deleted post successfully!';
    },
  },
};
