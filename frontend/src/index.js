import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import store from './redux/store';
import {setCurrentUser, logout} from './redux/auth/auth.actions';
import {setAuthToken} from './utils/setAuthToken';
import jwtDecode from 'jwt-decode';

const client = new ApolloClient({
  uri: 'http://localhost:3000',
  cache: new InMemoryCache(),
});

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwtDecode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = './login';
  }
}

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
