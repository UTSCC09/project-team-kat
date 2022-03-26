const userRepository = require('../../repository/dalUser');
const paymentRepository = require('../../repository/dalPayment');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const validateCredentials = require('../../utils/validateCredentials');
const checkAuth = require('../../utils/checkAuth');

const {ForbiddenError, UserInputError} = require('apollo-server-express');
const stripe = require('stripe')('sk_test_51KgrNAGQcUfT2LF4y9V23N76bE8YGconHsrRwSlr7co2g1bWqiP5FGeGNzPjgJACsXLC2Dw54w1cKxuIARJdENWU00XJaGexew');

dotenv.config();

module.exports = {
  Query: {
    getUser: async (_, {id}, context) => {
      const currentUser = checkAuth(context);
      if (currentUser.id != id) {
        throw new ForbiddenError('Unable to request data from external users!');
      }
      const user = await userRepository.getUserById(id);
      return user;
    },
  },

  Query: {
    createPaymentIntent: async (_, paymentInfo, context) => {
      // const currentUser = checkAuth(context);
      // if (currentUser.id != id) {
      //   throw new ForbiddenError('Unable to request data from external users!');
      // }
      // const user = await userRepository.getUserById(id);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 200,
        currency: 'cad',
        payment_method_types: ['card'],
        application_fee_amount: 100,
        transfer_data: {
          destination: 'acct_1KhHp82fDnpWQ1Hg',
        },
      });

      const payment = paymentRepository.createPayment(paymentIntent.client_secret);

      return payment;
    },
  },

  Mutation: {
    register: async (_, user) => {
      const {email, username, password} = user;
      if (!email || !username || !password) {
        throw new UserInputError('Missing required field from request!');
      }

      validateCredentials.validateUsername(username);
      validateCredentials.validateEmail(email);
      validateCredentials.validatePassword(password);

      const foundUser = await userRepository.getUserByEmail(email);
      if (foundUser) {
        throw new UserInputError('Email already registered. Please sign in.');
      }

      const newUser = await userRepository
          .createUser(email, username, password);

      const account = await stripe.accounts.create({type: 'express'});

      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: 'https://youtube.com',
        return_url: 'https://youtube.com',
        type: 'account_onboarding',
      });

      console.log(accountLink);

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
        throw new UserInputError('Missing required field from request!');
      }

      const foundUser = await userRepository.getUserByEmail(email);
      if (!foundUser) {
        throw new UserInputError('Invalid email. Please try again.');
      }

      const isValidPassword =
        await bcrypt.compare(password, foundUser.password);

      if (!isValidPassword) {
        throw new UserInputError('Invalid password. Please try again.');
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
