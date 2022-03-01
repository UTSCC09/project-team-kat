const Test = require('../../models/Test');

module.exports = {
  Query: {
    async getTests() {
      try {
        const tests = await Test.find();
        return tests;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
