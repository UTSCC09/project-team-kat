const userResolvers = require('./users');
const groupResolvers = require('./group');
const costResolvers = require('./cost');
const postResolvers = require('./posts');
const paymentResolvers = require('./payments');

// Combine all Query and Mutations
module.exports = {
  Query: {
    ...userResolvers.Query,
    ...groupResolvers.Query,
    ...costResolvers.Query,
    ...postResolvers.Query,
    ...paymentResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...groupResolvers.Mutation,
    ...costResolvers.Mutation,
    ...postResolvers.Mutation,
    ...paymentResolvers.Mutation,
  },
  Subscription: {
    ...postResolvers.Subscription,
  },
};
