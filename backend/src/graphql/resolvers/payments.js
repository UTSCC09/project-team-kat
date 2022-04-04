const checkAuth = require('../../utils/checkAuth');
const costRepository = require('../../repository/dalCost');
const userRepository = require('../../repository/dalUser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const {UserInputError} = require('apollo-server-errors');

dotenv.config();

// eslint-disable-next-line max-len
const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports = {
  Query: {
    createPaymentIntent: async (_, {costId}, context) => {
      checkAuth(context);
      if (!mongoose.isValidObjectId(costId)) {
        throw new UserInputError(`Invalid cost id: ${costId}`);
      }
      const foundCost = await costRepository.getCostById(costId);
      if (!foundCost) {
        throw new UserInputError(`Cost with id ${costId} not found`);
      }
      const costOwner = await userRepository.getUserById(foundCost.ownerId);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseFloat(foundCost.amount)*100,
        currency: 'cad',
        payment_method_types: ['card'],
        transfer_data: {
          destination: costOwner.stripeAccountId,
        },
      });
      return {clientSecret: paymentIntent.client_secret};
    },
  },
  Mutation: {
    completePayment: async (_, {costId}, context) => {
      checkAuth(context);
      if (!mongoose.isValidObjectId(costId)) {
        throw new UserInputError(`Invalid cost id: ${costId}`);
      }
      const foundCost = await costRepository.getCostById(costId);
      if (!foundCost) {
        throw new UserInputError(`Cost with id ${costId} not found`);
      }
      await costRepository.completeCostTransaction(costId);
    },
  },
};
