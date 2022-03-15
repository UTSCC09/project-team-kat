const userResolvers = require(`./users`);
const groupResolvers = require(`./group`);
const postResolvers = require(`./posts`);

// Combine all Query and Mutations
module.exports = {
  Query: {
    ...userResolvers.Query,
    ...groupResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...groupResolvers.Mutation,
    ...postResolvers.Mutation,
  },
};
