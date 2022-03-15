import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import store from './redux/store';
import {retrieveOldUser} from './utils/AuthToken';

const client = new ApolloClient({
  uri: 'http://localhost:3000',
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
