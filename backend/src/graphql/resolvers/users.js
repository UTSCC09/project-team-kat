const User = require('../../models/User');

const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config()

module.exports = {
  Query: {
    getUsers: async () => {
      const users = await User.find();
      return users;
    },
    
    getUser: async (_, { id }, context) => {
      if (!context.id) {
        throw new Error("User must be authenticated!");
      } else if (context.id != id) {
        throw new Error("Unable to request data from external users!");
      }

      const user = await User.findById(id);
      return user;
    }
  },
  
  Mutation: {
    register: async (_ , user) => {
      if (!user.email || !user.username || !user.password) {
        throw new Error("Missing required field from request!");
      }

      const password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      const newUser = new User({ email: user.email, username: user.username, password: password });

      const savedUser = await newUser.save();

      return savedUser;
    },

    login: async (_, user) => {
      if (!user.email || !user.password) {
        throw new Error("Missing required field from request!");
      }

      const foundUser = await User.findOne({ email: user.email });
      if (!foundUser) {
        throw new Error("Invalid email. Please try again.");
      }

      const isValidPassword = bcrypt.compare(user.password, foundUser.password);
      if (!isValidPassword) {
        throw new Error("Invalid password. Please try again.");
      }
      
      const jwtToken = jwt.sign(
        { id: foundUser.id, email: foundUser.email, username: foundUser.username },
        process.env.TOKEN_SECRET,
        { expiresIn: '30 days' }
      );

      return { jwt: jwtToken };
    }
  }
};
