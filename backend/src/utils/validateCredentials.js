const {UserInputError} = require('apollo-server');

module.exports = {
  validateEmail: (email) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      throw new UserInputError('Invalid email. Please try again.');
    }
  },
  validatePassword: (password) => {
    if (password.length < 7) {
      throw new UserInputError('Password must be at least 7 characters long!');
    }
  },
  validateUsername: (username) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (username.length < 6) {
      throw new UserInputError('Username must be at least 6 characters long!');
    }
    if (!username.match(usernameRegex)) {
      throw new UserInputError('Invalid username. Please try again.');
    }
  },
};
