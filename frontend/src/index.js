import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import {split, HttpLink} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import store from './redux/store';
import {retrieveOldUser} from './utils/AuthToken';

axios.defaults.baseURL = 'http://localhost:8000/graphql';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:3000/subscriptions',
}));

const splitLink = split(
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
  uri: 'http://localhost:8000/',
  link: splitLink,
  cache: new InMemoryCache(),
});

if (localStorage.jwtToken) retrieveOldUser(store.dispatch);

ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>,
    document.getElementById('root'),
);
