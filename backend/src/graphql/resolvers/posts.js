const postRepository = require('../../repository/dalPost');
const groupRepository = require('../../repository/dalGroup');

const dotenv = require('dotenv');

const {UserInputError, AuthenticationError} = require('apollo-server-express');
const checkAuth = require('../../utils/checkAuth');
const {withFilter} = require('graphql-subscriptions');

dotenv.config();

const UPDATE_NONE = 0;
const UPDATE_CONTENT = 1;
const UPDATE_LOCATION = 2;


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
      const {id, username} = checkAuth(context);

      const {title, message, group, left, top} = post;
      if (!title || !message || !group || !left || !top) {
        throw new UserInputError('Missing required field from request!');
      }

      const foundGroup = await groupRepository.getGroup(group);
      if (!foundGroup) {
        throw new UserInputError('Invalid group id!');
      }

      if (!foundGroup.members.includes(id)) {
        throw new AuthenticationError('Cannot access unauthorized groups!');
      }

      const newPost = await postRepository
          .createPost(id, title, message, username, group, left, top);

      context.pubsub.publish('postCreated', {
        postCreated: {
          id: newPost._id.toString(),
          title: newPost.title,
          message: newPost.message,
          author: newPost.author,
          group: newPost.group,
          left: newPost.left,
          top: newPost.top,
        },
      });

      return newPost;
    },
    updatePost: async (_, post, context) => {
      const user = checkAuth(context);

      const {id, group, title, message, left, top} = post;
      if (!id || !group) {
        throw new UserInputError('Missing required field from request!');
      }

      const foundGroup = await groupRepository.getGroup(group);
      if (!foundGroup.members.includes(user.id)) {
        throw new AuthenticationError('Cannot access unauthorized groups!');
      }

      const updated = {};
      let event = UPDATE_NONE;
      if (title) {
        updated.title = title;
        event = UPDATE_CONTENT;
      }
      if (message) {
        updated.message = message;
        event = UPDATE_CONTENT;
      }
      if (left && top) {
        updated.left = left;
        updated.top = top;
        event = UPDATE_LOCATION;
      }
      const updatedPost = await postRepository.updatePost(id, updated);

      context.pubsub.publish('postUpdated', {
        postUpdated: {
          post: {
            id: updatedPost._id.toString(),
            title: title ?? updatedPost.title,
            message: message ?? updatedPost.message,
            author: updatedPost.author,
            group: updatedPost.group,
            left: left ?? updatedPost.left,
            top: top ?? updatedPost.top,
          },
          updater: user,
          event: event,
        },
      });

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

      context.pubsub.publish('postDeleted', {
        group: group,
        postDeleted: id,
      });

      return 'Deleted post successfully!';
    },
  },

  Subscription: {
    postCreated: {
      subscribe: withFilter(
          (_, _a, {pubsub}) => pubsub.asyncIterator('postCreated'),
          (payload, {group}) => {
            return (payload.postCreated.group === group);
          },
      ),
    },
    postUpdated: {
      subscribe: withFilter(
          (_, _a, {pubsub}) => pubsub.asyncIterator('postUpdated'),
          (payload, {group}) => {
            return (payload.postUpdated.post.group === group);
          },
      ),
    },
    postDeleted: {
      subscribe: withFilter(
          (_, _a, {pubsub}) => pubsub.asyncIterator('postDeleted'),
          (payload, {group}) => {
            return (payload.group === group);
          },
      ),
    },
  },
};
