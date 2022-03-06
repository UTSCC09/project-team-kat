import axios from 'axios';
import {setAuthToken} from '../../utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import {
  SET_CURRENT_USER,
  USER_LOADING,
} from './auth.types';
import {LOGIN_MUTATION, REGISTER_MUTATION} from '../../graphql/auth.defs';

const handleToken = (token, navigate, dispatch) => {
  localStorage.setItem('jwtToken', token);
  setAuthToken(token);
  const decoded = jwtDecode(token);
  dispatch(setCurrentUser(decoded));
  navigate('/home');
};

const handleError = (error, setError) => {
  setError({code: error.extensions.code, message: error.message,
    type: error.extensions.type});
};

export const register = (userData, setError, navigate) => (dispatch) => {
  axios
      .post('http://localhost:8000',
          {
            query: REGISTER_MUTATION,
            variables: userData,
          },
      )
      .then((res) => res.data.errors ?
      handleError(res.data.errors[0], setError) :
      handleToken(res.data.data.register.jwt, navigate, dispatch),
      );
};

export const login = (userData, setError, navigate) => (dispatch) => {
  axios
      .post('http://localhost:8000',
          {
            query: LOGIN_MUTATION,
            variables: userData,
          })
      .then((res) =>
        res.data.errors ?
      handleError(res.data.errors[0], setError) :
      handleToken(res.data.data.login.jwt, navigate, dispatch),
      );
};

export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  navigate('/login');
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};
