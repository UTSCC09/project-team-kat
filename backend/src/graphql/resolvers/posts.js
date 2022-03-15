const postRepository = require('../../repository/dalPost');
const userRepository = require('../../repository/dalUser');
const groupRepository = require('../../repository/dalGroup');

const dotenv = require('dotenv');

const {UserInputError} = require('apollo-server');
const checkAuth = require('../../utils/checkAuth');

dotenv.config();

module.exports = {
  Query: {
    getPostsByGroup: async (_, {id}, context) => {
      checkAuth(context);

      const posts = await postRepository.getPostsByGroup(id);
      return posts;
    },
  },

  Mutation: {
    createPost: async (_, post) => {
      const {uid, title, message, author, group, left, top} = post;
      if (!uid || !title || !message || !author || !group || !left || !top) {
        throw new UserInputError('Missing required field from request!');
      }

      const foundAuthor = await userRepository.getUserById(uid);
      if (!foundAuthor) {
        throw new UserInputError('Invalid author id!');
      }

      const foundGroup = await groupRepository.getGroup(group);
      if (!foundGroup) {
        throw new UserInputError('Invalid group id!');
      }

      const newPost = await postRepository
          .createPost(uid, title, message, author, group, left, top);

      return newPost;
    },
    updatePost: async (_, {post}) => {
      const {uid, title, message, author, group, left, top} = post;
      if (!uid || !title || !message || !author || !group || !left || !top) {
        throw new UserInputError('Missing required field from request!');
      }

      const foundAuthor = await userRepository.getUserById(uid);
      if (!foundAuthor) {
        throw new UserInputError('Invalid author id!');
      }

      const foundGroup = await groupRepository.getGroup(group);
      if (!foundGroup) {
        throw new UserInputError('Invalid group id!');
      }

      await postRepository.updatePost(post.id, post);
      return 'Successfully Updated!';
    },
    deletePost: async (_, id) => {
      await postRepository.delete(id);

      return 'Deleted post successfully!';
    },
  },
};
