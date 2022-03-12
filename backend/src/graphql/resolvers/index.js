const userResolvers = require(`./users`);
const groupResolvers = require(`./group`);

// Combine all Query and Mutations
module.exports = {
  Query: {
    ...userResolvers.Query,
    ...groupResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...groupResolvers.Mutation,
  },
};
