const Post = require('../models/Post');
const {ApolloError} = require('apollo-server-errors');

module.exports = {
  createPost: async (title, message, author, group, fabricObject) => {
    try {
      const post = new Post({title, message, author, group, fabricObject});
      const savedPost = await post.save();
      return savedPost;
    } catch (err) {
      throw new ApolloError('Internal Error.');
    }
  },
  getPostsByGroup: async (id) => {
    try {
      const foundPosts = await Post.find({group: id});
      return foundPosts;
    } catch (err) {
      throw new ApolloError('Internal Error.');
    }
  },
  delete: async (id) => {
    try {
      const deleteRes = await Post.deleteOne({id});
      return deleteRes;
    } catch (err) {
      throw new ApolloError('Internal Error.');
    }
  },
};
