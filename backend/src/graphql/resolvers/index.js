const testResolvers = require('./Test');

// Combine all Query and Mutations
module.exports = {
  Query: {
    ...testResolvers.Query,
  },
};
