import axios from 'axios';
import {setAuthToken} from '../../utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import {
  SET_CURRENT_USER,
  USER_LOADING,
} from './auth.types';
import {LOGIN_MUTATION, REGISTER_MUTATION} from '../../graphql/auth.defs';

export const register = (userData, navigate) => (dispatch) => {
  axios
      .post('http://localhost:8000',
          {
            query: REGISTER_MUTATION,
            variables: userData,
          },
      )
      .then((res) => navigate('/login'));
};

export const login = (userData, navigate) => (dispatch) => {
  axios
      .post('http://localhost:8000',
          {
            query: LOGIN_MUTATION,
            variables: userData,
          })
      .then((res) => {
        const token = res.data.data.login.jwt;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwtDecode(token);
        dispatch(setCurrentUser(decoded));
        navigate('/');
      });
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
