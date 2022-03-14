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
        title: String!
        message: String!
        author: String!
        group: String!
        fabricObject: String!
    }
    type JwtToken {
        jwt: ID!
    }
    type Query {
        getUser(id: ID!): User
        getPostsByGroup(id: ID!): [Post]
    }
    type Mutation {
        register(email: String!, username: String!, password: String!): User!
        login(email: String!, password: String!): JwtToken!

        createPost(
            title: String!, 
            message: String!, 
            author: String!, 
            group: String!, 
            fabricObject: String!
        ): Post
        deletePost(id: ID!): String!
    }
`;
