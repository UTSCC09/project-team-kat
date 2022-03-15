const userResolvers = require(`./users`);
const groupResolvers = require(`./group`);
const costResolvers = require('./cost');

// Combine all Query and Mutations
module.exports = {
  Query: {
    ...userResolvers.Query,
    ...groupResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...groupResolvers.Mutation,
    ...costResolvers.Mutation,
  },
};
