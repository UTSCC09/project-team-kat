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

const {REACT_APP_PRODUCTION, REACT_APP_DEV_HTTPS_URL, REACT_APP_PROD_HTTPS_URL,
  REACT_APP_PROD_WEBSOCKET_URL, REACT_APP_DEV_WEBSOCKET_URL} =
  process.env;

const baseHttpURL = REACT_APP_PRODUCTION === 'true' ?
REACT_APP_PROD_HTTPS_URL + '/graphql' :
REACT_APP_DEV_HTTPS_URL + '/graphql';

const websocketURL = REACT_APP_PRODUCTION === 'true' ?
REACT_APP_PROD_WEBSOCKET_URL + '/graphql' :
REACT_APP_DEV_WEBSOCKET_URL + '/graphql';

axios.defaults.baseURL = baseHttpURL;

console.log(baseHttpURL);

const httpLink = new HttpLink({
  uri: baseHttpURL,
});

const wsLink = new GraphQLWsLink(createClient({
  url: websocketURL,
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
        <HashRouter history={window.history}>
          <App />
        </HashRouter>
      </Provider>
    </ApolloProvider>,
    document.getElementById('root'),
);
