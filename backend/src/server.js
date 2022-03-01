require('dotenv').config();
const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const port = process.env.SERVER_PORT;
const dbUsername = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbURI = `mongodb+srv://${dbUsername}:${dbPassword}@paymates.873s7.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(dbURI).then(() => {
  console.log('Connected to MongoDB');
  return server.listen({port});
}).then((res) => {
  console.log(`Server running at ${res.url}`);
});


