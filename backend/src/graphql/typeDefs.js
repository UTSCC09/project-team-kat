const gql = require('graphql-tag');

// Define all Query and Mutation Schemas
module.exports = gql`
    type Payment {
        clientSecret: String!
    }
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
    type Post {
        id: ID!
        title: String!
        message: String!
        author: String!
        group: String!
        left: Int!
        top: Int!
    }
    type JwtToken {
        jwt: ID!
    }
    type PaginatedGroups {
        data: [Group!]!
        totalItems: Int
    }
    type PaginatedCosts {
        data: [Cost]
        totalItems: Int
    }
    type NewAccountResponse {
        jwt: ID!
        stripeUrl: String!
    }
    type Query {
        createPaymentIntent(costId: ID!): Payment!
        getUser(id: ID!): User!
        getGroups(limit: Int, skip: Int): PaginatedGroups!
        getPostsByGroup(id: ID!): [Post]
        getGroup(id: ID!): Group!
        getCostsByGroup(id: ID!): [Cost]
        getPaginatedCostsByGroup(id: ID!, limit: Int, skip: Int): PaginatedCosts
    }
    type Mutation {
        register(email: String!, username: String!, 
            password: String!): NewAccountResponse!
        login(email: String!, password: String!): JwtToken!

        createPost(
            title: String!, 
            message: String!,  
            group: String!,
            left: Int!,
            top: Int!,
        ): Post!
        updatePost(
            id: ID!,
            group: String!,
            title: String!, 
            message: String!, 
            left: Int!,
            top: Int!,
        ): String!
        deletePost(id: ID!, group: String!): String!

        createGroup(name: String!): Group!
        joinGroup(code: String!): Group!
        createCost(name: String!, amount: String!, 
            applicableUsers: [String!]!, groupId: String!): Cost!
        
        completePayment(costId: ID!): Cost
    }
`;
