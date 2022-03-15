const gql = require('graphql-tag');

// Define all Query and Mutation Schemas
module.exports = gql`
    type User {
        id: ID!
        email: String!
        username: String!
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
        getUser(id: ID!): User
        getPostsByGroup(id: ID!): [Post]
        getGroup(id: ID!): Group!
        getGroups: [Group!]!
    }
    type Mutation {
        register(email: String!, username: String!, 
            password: String!): JwtToken!
        login(email: String!, password: String!): JwtToken!

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

        createGroup(name: String!): Group!
        joinGroup(code: String!): Group!
    }
`;
