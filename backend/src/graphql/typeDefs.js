const gql = require('graphql-tag');

// Define all Query and Mutation Schemas
module.exports = gql`
    type Test{
        name: String!,
        email: String!,
        message: String!
    }
    type Query{
        getTests: [Test]
    }
`;
