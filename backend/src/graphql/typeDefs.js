const gql = require('graphql-tag');

// Define all Query and Mutation Schemas
module.exports = gql`
    type Cost {
        id: ID!
        name: String!
        ownerId: ID!
        groupId: ID!
        amount: String!
        applicableUsers: [User!]
    }
    type User {
        id: ID!
        email: String!
        username: String!
    }
    type Group {
        id: ID!
        name: String!
        members: [User!]!
        code: String!
    }
    type JwtToken {
        jwt: ID!
    }
    type Query {
        getUser(id: ID!): User!
        getGroups: [Group!]!
    }
    type Mutation {
        register(email: String!, username: String!, 
            password: String!): JwtToken!
        login(email: String!, password: String!): JwtToken!
        createGroup(name: String!): Group!
        joinGroup(code: String!): Group!
        createCost(name: String!, amount: String!, 
            applicableUsers: [String!]!, groupId: String!): Cost!
    }
`;
