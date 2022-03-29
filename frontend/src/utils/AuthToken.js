import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {setCurrentUser} from '../redux/auth/auth.actions';


const setAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const retrieveOldUser = (dispatch) => {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwtDecode(token);
  dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    removeOldUser(dispatch);
    window.location.href = './login';
  }
};

export const setNewUser = (token, dispatch) => {
  localStorage.setItem('jwtToken', token);
  setAuthToken(token);
  const decoded = jwtDecode(token);
  dispatch(setCurrentUser(decoded));
};

export const removeOldUser = (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
