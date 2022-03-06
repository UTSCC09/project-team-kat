const userRepository = require('../../repository/dalUser');

const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const validateCredentials = require('../../utils/validateCredentials');

const {AuthenticationError, ForbiddenError,
  ApolloError} = require('apollo-server');

dotenv.config();

module.exports = {
  Query: {
    getUser: async (_, {id}, context) => {
      if (!context.id) {
        throw new AuthenticationError('User must be authenticated!');
      } else if (context.id != id) {
        throw new ForbiddenError('Unable to request data from external users!');
      }
      const user = await userRepository.getUserById(id);
      return user;
    },
  },

  Mutation: {
    register: async (_, user) => {
      const {email, username, password} = user;
      if (!email || !username || !password) {
        throw new ApolloError('Missing required field from request!',
            'BAD_USER_INPUT', {type: 'MISSING_FIELD'});
      }

      validateCredentials.validateEmail(email);
      validateCredentials.validateUsername(username);
      validateCredentials.validatePassword(password);

      const foundUser = await userRepository.getUserByEmail(email);
      if (foundUser) {
        throw new ApolloError('Email already registered. Please sign in.',
            'BAD_USER_INPUT', {type: 'INVALID_EMAIL'});
      }

      const newUser = await userRepository
          .createUser(email, username, password);

      const jwtToken = jwt.sign(
          {id: newUser.id, email, username},
          process.env.TOKEN_SECRET,
          {expiresIn: '30 days'},
      );

      return {jwt: jwtToken};
    },

    login: async (_, user) => {
      const {email, password} = user;
      if (!email || !password) {
        throw new ApolloError('Missing required field from request!',
            'BAD_USER_INPUT', {type: 'MISSING_FIELD'});
      }

      const foundUser = await userRepository.getUserByEmail(email);
      if (!foundUser) {
        throw new ApolloError('Invalid email. Please try again.',
            'BAD_USER_INPUT', {type: 'INVALID_EMAIL'});
      }

      const isValidPassword =
        await bcrypt.compare(password, foundUser.password);

      if (!isValidPassword) {
        throw new ApolloError('Invalid password. Please try again.',
            'BAD_USER_INPUT', {type: 'INVALID_PASSWORD'});
      }

      const jwtToken = jwt.sign(
          {id: foundUser.id, email: foundUser.email,
            username: foundUser.username},
          process.env.TOKEN_SECRET,
          {expiresIn: '30 days'},
      );

      return {jwt: jwtToken};
    },
  },
};
