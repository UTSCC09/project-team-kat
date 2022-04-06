import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import {split, HttpLink} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import store from './redux/store';
import {retrieveOldUser} from './utils/AuthToken';

axios.defaults.baseURL = 'https://paymates.me/graphql';

const httpLink = new HttpLink({
  uri: 'https://paymates.me/graphql',
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://paymates.me/graphql',
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
  link: splitLink,
  cache: new InMemoryCache(),
});

if (localStorage.jwtToken) retrieveOldUser(store.dispatch);

ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <HashRouter history={history}>
          <App />
        </HashRouter>
      </Provider>
    </ApolloProvider>,
    document.getElementById('root'),
);
