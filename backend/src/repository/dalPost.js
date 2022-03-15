const Post = require('../models/Post');
const {ApolloError} = require('apollo-server-errors');

module.exports = {
  createPost: async (uid, title, message, author, group, left, top) => {
    try {
      const post = new Post({uid, title, message, author, group, left, top});
      const savedPost = await post.save();
      return savedPost;
    } catch (err) {
      throw new ApolloError('Internal Error. ');
    }
  },
  updatePost: async (id, post) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(id, post);
      return updatedPost;
    } catch (err) {
      throw new ApolloError('Internal Error.' + err);
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
