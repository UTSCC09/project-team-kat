const {ApolloError} = require('apollo-server');

module.exports = {
  validateEmail: (email) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      throw new ApolloError('Invalid email. Please try again.',
          'BAD_USER_INPUT', {type: 'INVALID_EMAIL'});
    }
  },
  validatePassword: (password) => {
    if (password.length < 7) {
      throw new ApolloError('Password must be at least 7 characters long!',
          'BAD_USER_INPUT', {type: 'INVALID_PASSWORD'});
    }
  },
  validateUsername: (username) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (username.length < 6) {
      throw new ApolloError('Username must be at least 6 characters long!',
          'BAD_USER_INPUT', {type: 'INVALID_USERNAME'});
    }
    if (!username.match(usernameRegex)) {
      throw new UserInputError('Invalid username. Please try again.',
          'BAD_USER_INPUT', {type: 'INVALID_USERNAME'});
    }
  },
};
