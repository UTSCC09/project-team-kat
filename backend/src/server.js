/* eslint-disable new-cap */
require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const {ApolloServer} = require('apollo-server-express');

const {ApolloServerPluginDrainHttpServer} = require('apollo-server-core');
const {makeExecutableSchema} = require('@graphql-tools/schema');
const {WebSocketServer} = require('ws');
const {useServer} = require('graphql-ws/lib/use/ws');

const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const port = process.env.SERVER_PORT;
const dbUsername = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbURI = `mongodb+srv://${dbUsername}:${dbPassword}@paymates.873s7.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const schema = makeExecutableSchema({typeDefs, resolvers});

const app = express();
app.use(cors());
const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/',
});
const serverCleanup = useServer({schema}, wsServer);

const server = new ApolloServer({
  schema,
  context: ({req}) => ({req}),
  plugins: [
    ApolloServerPluginDrainHttpServer({httpServer}),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

server.start().then(() => {
  server.applyMiddleware({app});

  mongoose.connect(dbURI).then(() => {
    console.log('Connected to MongoDB');
    return httpServer.listen({port});
  }).then((res) => {
    console.log(`Server running at http://localhost:${port}/graphql`);
  }).catch((err) => console.log(err));
});
