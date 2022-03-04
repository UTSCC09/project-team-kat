const userResolvers = require(`./users`);

// Combine all Query and Mutations
module.exports = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};
