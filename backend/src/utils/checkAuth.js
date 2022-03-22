const dotenv = require('dotenv');
const {AuthenticationError, UserInputError} = require('apollo-server-express');
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        return user;
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new UserInputError('Authentication token must'+
      ' be of the form \'Bearer [token]\'');
  }
  throw new UserInputError('Authentication header missing');
};
