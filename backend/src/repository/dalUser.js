const User = require('../models/User');
const mongoose = require('mongoose');
const {ApolloError} = require('apollo-server-errors');
const bcrypt = require('bcrypt');

module.exports = {
  createUser: async (email, username, password) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const newUser = new User({username, email, password: hashedPassword});
      const savedUser = await newUser.save();
      return savedUser;
    } catch (err) {
      throw new ApolloError('Internal Error.');
    } finally {
      await session.endSession();
    }
  },
  getUserByEmail: async (email) => {
    try {
      const foundUser = await User.findOne({email});
      return foundUser;
    } catch (err) {
      throw new ApolloError('Internal Error.');
    }
  },
  getUserById: async (id) => {
    try {
      const foundUser = await User.findById(id);
      return foundUser;
    } catch (err) {
      throw new ApolloError('Internal Error.');
    }
  },
};
