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
    type Post {
        id: ID!
        uid: ID!
        title: String!
        message: String!
        author: String!
        group: String!
        left: Int!
        top: Int!
    }
    input PostInput {
        id: String!
        uid: String!
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
    type Query {
        getUser(id: ID!): User!
        getGroups(limit: Int, skip: Int): PaginatedGroups!
        getPostsByGroup(id: ID!): [Post]
        getGroup(id: ID!): Group!
    }
    type Mutation {
        register(email: String!, username: String!, 
            password: String!): JwtToken!
        login(email: String!, password: String!): JwtToken!
        createGroup(name: String!): Group!
        joinGroup(code: String!): Group!
        createCost(name: String!, amount: String!, 
            applicableUsers: [String!]!, groupId: String!): Cost!
        createPost(
            uid: String!,
            title: String!, 
            message: String!, 
            author: String!, 
            group: String!,
            left: Int!,
            top: Int!,
        ): Post!
        updatePost(post: PostInput!): String!
        deletePost(id: ID!): String!
    }
`;
