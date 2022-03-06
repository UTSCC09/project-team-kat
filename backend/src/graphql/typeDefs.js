const gql = require('graphql-tag');

// Define all Query and Mutation Schemas
module.exports = gql`
    type User {
        id: ID!
        email: String!
        username: String!
    }
    type JwtToken {
        jwt: ID!
    }
    type Query {
        getUser(id: ID!): User
    }
    type Mutation {
        register(email: String!, username: String!, 
            password: String!): JwtToken!
        login(email: String!, password: String!): JwtToken!
    }
`;
