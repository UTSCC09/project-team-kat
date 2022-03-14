const postRepository = require('../../repository/dalPost');
const userRepository = require('../../repository/dalUser');

const dotenv = require('dotenv');

const {UserInputError, AuthenticationError} = require('apollo-server');

dotenv.config();

module.exports = {
  Query: {
    getPostsByGroup: async (_, {id}, context) => {
      if (!context.id) {
        throw new AuthenticationError('User must be authenticated!');
      }

      const posts = await postRepository.getPostsByGroup(id);
      return posts;
    },
  },

  Mutation: {
    createPost: async (_, post) => {
      const {title, message, author, group, fabricObject} = post;
      if (!title || !message || !author || !group || !fabricObject) {
        throw new UserInputError('Missing required field from request!');
      }

      const foundAuthor = await userRepository.getUserById(author);
      if (!foundAuthor) {
        throw new UserInputError('Invalid author id!');
      }

      // TODO: Validate group id is valid too

      const newPost = await postRepository
          .createPost(title, message, author, group, fabricObject);
      return newPost;
    },

    deletePost: async (_, id) => {
      await postRepository.delete(id);

      return 'Deleted post successfully!';
    },
  },
};
