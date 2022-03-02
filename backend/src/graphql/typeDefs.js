const gql = require('graphql-tag');

// Define all Query and Mutation Schemas
module.exports = gql`
    type User {
        id: ID!
        email: String!
        username: String!
        password: String!
    }
    type JwtToken {
        jwt: ID!
    }
    type Query {
        getUser(id: ID!): User
        getUsers: [User]
    }
    type Mutation {
        register(email: String!, username: String!, password: String!): User!
        login(email: String!, password: String!): JwtToken!
    }
`;
